const CreateOfferCard = () => {
  return (
    <>
      <div className='card w-full md:w-96 bg-base-100 shadow-xl mt-10'>
        <figure>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/alemanha-para-brasileiros.appspot.com/o/app%2Fbrigadeiros.jpeg?alt=media&token=716aa975-6466-4eee-b7aa-736da5b9b4eb'
            alt='Brigadeiros'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>Oferece algum serviço ou produto?</h2>
          <p>
            Anuncie gratuitamente para a comunidade de brasileiros na Alemanha.
            Pague somente se quiser destaque ouro .
          </p>
          <div className='card-actions mt-5 '>
            <button className='btn btn-primary text-emerald-50'>
              Divulgue grátis
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOfferCard;
