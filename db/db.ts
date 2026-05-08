import { MongoClient, Db, Filter, Sort, Document } from 'mongodb'
import { randomUUID } from 'crypto'

const uri = process.env.MONGREAL_URI
if (!uri) throw new Error('MONGREAL_URI is not set')

const DB_NAME = 'cprg'

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const clientPromise: Promise<MongoClient> =
  globalThis._mongoClientPromise ?? new MongoClient(uri).connect()

if (process.env.NODE_ENV !== 'production') {
  globalThis._mongoClientPromise = clientPromise
}

async function getDb(): Promise<Db> {
  const client = await clientPromise
  return client.db(DB_NAME)
}

type WhereClause = Record<string, any>
type SelectClause = Record<string, boolean>
type OrderByClause = Record<string, 'asc' | 'desc'>

function translateWhere(where: WhereClause | undefined): Filter<Document> {
  if (!where) return {}
  const out: Filter<Document> = {}
  for (const [key, value] of Object.entries(where)) {
    const fieldKey = key === 'id' ? '_id' : key
    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      const op: Record<string, any> = {}
      for (const [k, v] of Object.entries(value as Record<string, any>)) {
        if (k === 'not') op.$ne = v
        else if (k === 'in') op.$in = v
        else if (k === 'notIn') op.$nin = v
        else if (k === 'gt') op.$gt = v
        else if (k === 'gte') op.$gte = v
        else if (k === 'lt') op.$lt = v
        else if (k === 'lte') op.$lte = v
        else op[k] = v
      }
      ;(out as any)[fieldKey] = op
    } else {
      ;(out as any)[fieldKey] = value
    }
  }
  return out
}

function translateSelect(select: SelectClause | undefined): Record<string, 1> | undefined {
  if (!select) return undefined
  const proj: Record<string, 1> = {}
  for (const [k, v] of Object.entries(select)) {
    if (!v) continue
    if (k === 'id') continue
    proj[k] = 1
  }
  return proj
}

function translateOrderBy(orderBy: OrderByClause | OrderByClause[] | undefined): Sort | undefined {
  if (!orderBy) return undefined
  const arr = Array.isArray(orderBy) ? orderBy : [orderBy]
  const sort: Record<string, 1 | -1> = {}
  for (const o of arr) {
    for (const [k, dir] of Object.entries(o)) {
      sort[k] = dir === 'desc' ? -1 : 1
    }
  }
  return sort
}

function fromMongo<T extends { _id?: any }>(doc: T | null): any {
  if (!doc) return doc
  const { _id, ...rest } = doc as any
  return { id: _id, ...rest }
}

function model<TData extends Record<string, any>>(collectionName: string) {
  return {
    async findMany(args?: { where?: WhereClause; select?: SelectClause; orderBy?: OrderByClause | OrderByClause[] }) {
      const db = await getDb()
      const col = db.collection(collectionName)
      let cursor = col.find(translateWhere(args?.where))
      const proj = translateSelect(args?.select)
      if (proj) cursor = cursor.project(proj) as any
      const sort = translateOrderBy(args?.orderBy)
      if (sort) cursor = cursor.sort(sort)
      const docs = await cursor.toArray()
      return docs.map(fromMongo)
    },

    async findFirst(args?: { where?: WhereClause; select?: SelectClause; orderBy?: OrderByClause | OrderByClause[] }) {
      const db = await getDb()
      const col = db.collection(collectionName)
      const proj = translateSelect(args?.select)
      const sort = translateOrderBy(args?.orderBy)
      const doc = await col.findOne(translateWhere(args?.where), {
        ...(proj ? { projection: proj } : {}),
        ...(sort ? { sort } : {}),
      })
      return fromMongo(doc)
    },

    async findUnique(args: { where: { id: string }; select?: SelectClause }) {
      const db = await getDb()
      const col = db.collection(collectionName)
      const proj = translateSelect(args?.select)
      const doc = await col.findOne(
        { _id: args.where.id as any },
        proj ? { projection: proj } : undefined
      )
      return fromMongo(doc)
    },

    async create(args: { data: Partial<TData> }) {
      const db = await getDb()
      const col = db.collection(collectionName)
      const now = new Date()
      const _id = randomUUID()
      const doc: any = {
        _id,
        ...args.data,
        createdAt: (args.data as any).createdAt ?? now,
        updatedAt: (args.data as any).updatedAt ?? now,
      }
      await col.insertOne(doc)
      return fromMongo(doc)
    },

    async update(args: { where: { id: string }; data: Partial<TData> }) {
      const db = await getDb()
      const col = db.collection(collectionName)
      const { id: _ignored, ...rest } = (args.data as any)
      const $set: any = { ...rest, updatedAt: new Date() }
      const result = await col.findOneAndUpdate(
        { _id: args.where.id as any },
        { $set },
        { returnDocument: 'after' }
      )
      return fromMongo(result as any)
    },

    async delete(args: { where: { id: string } }) {
      const db = await getDb()
      const col = db.collection(collectionName)
      const result = await col.findOneAndDelete({ _id: args.where.id as any })
      return fromMongo(result as any)
    },
  }
}

const db = {
  blog: model('blogs'),
  podcast: model('podcasts'),
  video: model('videos'),
  visitorsCounter: model('visitorsCounters'),
}

export default db
