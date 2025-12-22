import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      message,
      honeypot,
      detectionType,
      detectionDetails,
      locale,
      origin,
      timeSpent,
    } = body

    // Get user agent and IP address from request headers
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const ipAddress =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'Unknown'

    // Log bot attempt to console
    console.log('🤖 BOT ATTEMPT DETECTED:', {
      detectionType,
      detectionDetails,
      timeSpent: timeSpent ? `${timeSpent}ms` : 'N/A',
      ipAddress,
      userAgent,
      locale,
      origin,
      formData: {
        name,
        email,
        phone,
        messageLength: message?.length || 0,
        honeypotValue: honeypot,
      },
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Bot attempt logged successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error logging bot attempt:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to log bot attempt',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
