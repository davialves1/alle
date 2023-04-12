import AlleButton from '../../common/alle-ui/AlleButton';

const CreateOffer = () => {
  return (
    <>
      <form className='bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mt-10 mb-5'>
        <h1 className='mt-3 text-emerald-500 mb-8 text-3xl'>Crie um anúncio</h1>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Username
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            type='text'
            placeholder='Username'
          />
        </div>

        <AlleButton className='mt-5'>Criar uma oferta</AlleButton>
        <span className='text-slate-500 text-sm'>
          <p className='mt-10'>
            Gostaríamos de lembrá-lo(a) que você é responsável por tudo o que
            anuncia em nosso site, incluindo o cumprimento das obrigações legais
            da Alemanha. Sabemos que você é uma pessoa responsável e
            comprometida, então confiamos que vai cuidar disso sem problemas.
            Lembre-se de verificar todas as leis e regulamentações aplicáveis ao
            seu anúncio e garantir que tudo esteja em ordem.
          </p>
          <p className='mt-5 mb-10'>
            Nós estamos aqui para ajudá-lo(a) no que for preciso, então não
            hesite em entrar em contato caso precise de ajuda ou tenha alguma
            dúvida. Nosso objetivo é fornecer uma plataforma segura e confiável
            para que você possa divulgar seus produtos e serviços para a
            comunidade brasileira na Alemanha. Contamos com a sua colaboração
            para mantermos um ambiente amigável e respeitoso em nossa
            plataforma.
          </p>
        </span>
      </form>
    </>
  );
};

export default CreateOffer;
