const CreateOfferCard = () => {
  return (
    <>
      <div className='card w-full md:w-96 bg-base-100 shadow-xl mt-10'>
        <figure>
          <img src='src/assets/brigadeiros.jpeg' alt='Brigadeiros' />
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
