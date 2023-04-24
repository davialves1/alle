import AlleBody from '../../common/alle-ui/AlleBody';
import AlleHeader from '../../common/alle-ui/AlleHeader';

const CreateOffer = () => {
  return (
    <>
      <AlleHeader />
      <AlleBody>
        <form className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mt-10 mb-5 sm:w-10/12 md:w-1/2 xl:w-1/4'>
          <h1 className='mt-3 text-emerald-500 mb-8 text-3xl'>
            Crie um anúncio
          </h1>
          {Array.from(Array(10)).map((_, i) => (
            <div key={i}>
              <span className='label-text'>Nome fantasia ou seu nome</span>
              <input
                type='text'
                placeholder='Ex.: Brigadeiros Brasil'
                className='input input-bordered w-full max-w-xs mt-2'
              />
            </div>
          ))}

          <button className='mt-5 btn btn-primary'>Criar uma oferta</button>
          <span className='text-slate-500 text-sm'>
            <p className='mt-10'>
              Gostaríamos de lembrá-lo(a) que você é responsável por tudo o que
              anuncia em nosso site, incluindo o cumprimento das obrigações
              legais da Alemanha. Sabemos que você é uma pessoa responsável e
              comprometida, então confiamos que vai cuidar disso sem problemas.
              Lembre-se de verificar todas as leis e regulamentações aplicáveis
              ao seu anúncio e garantir que tudo esteja em ordem.
            </p>
            <p className='mt-5 mb-10'>
              Nós estamos aqui para ajudá-lo(a) no que for preciso, então não
              hesite em entrar em contato caso precise de ajuda ou tenha alguma
              dúvida. Nosso objetivo é fornecer uma plataforma segura e
              confiável para que você possa divulgar seus produtos e serviços
              para a comunidade brasileira na Alemanha. Contamos com a sua
              colaboração para mantermos um ambiente amigável e respeitoso em
              nossa plataforma.
            </p>
          </span>
        </form>
      </AlleBody>
    </>
  );
};

export default CreateOffer;
