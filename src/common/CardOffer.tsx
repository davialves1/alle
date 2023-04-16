import {
  Card,
  Typography,
  IconButton,
  AspectRatio,
  Box,
  Button,
} from '@mui/joy';
import { Offer } from './offer-model';
import { Link } from 'react-router-dom';
import AlleButton from './alle-ui/AlleButton';
import { ColorVariants } from './models/ColorVariants';

const CardOffer = ({ offer }: { offer: Offer }) => {
  return (
    <Link to={`offer-detail/${offer.offerId}`}>
      <Card
        variant='plain'
        sx={{ width: 320, margin: 1, height: 340, padding: 3 }}
      >
        <h2 className='text-emerald-500 bold text-xl truncate'>
          {offer.company}
        </h2>
        <Typography level='body2'>{offer.shortdescription}</Typography>
        <IconButton
          aria-label='bookmark Bahamas Islands'
          variant='plain'
          color='neutral'
          size='sm'
          sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
        ></IconButton>
        <AspectRatio minHeight='120px' maxHeight='200px' sx={{ my: 2 }}>
          <img
            src='https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286'
            srcSet='https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x'
            loading='lazy'
            alt=''
          />
        </AspectRatio>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Typography level='body3'>Total price:</Typography>
            <Typography fontSize='lg' fontWeight='lg'>
              $2,900
            </Typography>
          </div>
          <AlleButton>Explore</AlleButton>
        </Box>
      </Card>
    </Link>
  );
};

export default CardOffer;
