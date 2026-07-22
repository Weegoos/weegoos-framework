import { RADIUS_MAP, SIZE_MAP, ELEVATION_MAP, COLOR_MAP } from '../tokens/card.tokens';

export default {
  theme: {
    extend: {
      borderRadius: RADIUS_MAP,
      spacing: SIZE_MAP,
      boxShadow: ELEVATION_MAP,
    },
  },
};