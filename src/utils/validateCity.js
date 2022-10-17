
import REGEX_CITY from '../constants/REGEX_CITY';
function validateCity(data) {
    const testCity = REGEX_CITY.test(data);
    if (!testCity) {
      return false;
    }
    return true;
  }

  export default validateCity