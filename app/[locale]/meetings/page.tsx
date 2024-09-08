import Footer from '@/components/Footer'
import PagesHeader from '@/components/PagesHeader'
import React from 'react'

const Meetings = () => {
  return (
    <>
      <PagesHeader />
      <div className='text-white px-4 lg:px-[10%] text-[20px] flex flex-col gap-2 pb-8'>
        <h1 className='text-center text-[25px] my-8'>
          Co děláme na nedělním setkání?
        </h1>
        <p className='leading-[25px]'>
          - Neděli nazýváme dnem Páně. Jedná se o první den v týdnu, den Pánova
          vzkříšení. Od počátků církve se křesťané společně scházeli v den Páně,
          aby si připomínali Pána a sdíleli Boží Slovo.
        </p>
        <p className='italic text-[18.5px]'>
          První den v týdnu jsme se sešli k lámání chleba. Pavel s nimi
          rozmlouval… a protáhl svou řeč až do půlnoci.
          <span className='text-[15px]'> (Skutky 20,7)</span>
        </p>
        <p className='italic text-[18.5px]'>
          V den Páně jsem se ocitl v duchu…
          <span className='text-[15px]'> (Zjevení 1,10)</span>
        </p>

        <h2>
          - Program našeho setkání v den Páně Pánův stůl (9.30 - 10.30 hod)
        </h2>
        <p className='text-[18.5px]'>
          U Pánova stolu (při tzv. Večeři Páně) lámeme chléb a pijeme kalich,
          abychom si připomínali našeho Pána Ježíše Krista. Zatímco máme podíl
          na chlebu a kalichu, zpíváme chvalozpěvy a chválíme Pána.
        </p>
        <p className='italic text-[18.5px]'>
          Pak vzal chléb, vzdal díky, rozlomil a dal jim se slovy: „Toto je mé
          tělo, které se za vás dává. To čiňte na mou památku. A právě tak vzal
          po večeři kalich a řekl: „Tento kalich je nová smlouva v mé krvi,
          která se za vás vylévá.“{' '}
          <span className='text-[15px]'> (Lukáš 22,19-20)</span>
        </p>
        <p>- Prorokovací setkání (10:30 – 11:30 hod)</p>
        <p className='text-[18.5px]'>
          Prorokovat znamená především mluvit Boží Slovo. Nemáme žádného
          ustanoveného kazatele, který by prorokoval, protože Bible říká, že
          prorokovat můžeme všichni. Bratři a sestry v církvi jsou každý týden
          povzbuzováni, aby četli Svaté Slovo pro ranní obživení a během setkání
          v den Páně se pak sdíleli o tom, z čeho se těšili. Nicméně je možné se
          sdílet i na nějaké jiné téma.
        </p>
        <p className='italic text-[18.5px]'>
          Jeden po druhém můžete všichni prorokovat, aby se všichni učili a
          všichni byli povzbuzováni.{' '}
          <span className='text-[15px]'> (1. Korintským 14,31)</span>
        </p>
      </div>
      <Footer />
    </>
  )
}

export default Meetings
