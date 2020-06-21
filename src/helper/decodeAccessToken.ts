import jwtDecode from 'jwt-decode'

const decodeAccessToken = () => {
  const accessToken =
    typeof document !== 'undefined'
      ? localStorage.getItem('access_token')
      : null;
  const decode = !!accessToken ? jwtDecode(accessToken) : null;

  return decode
}

export default decodeAccessToken