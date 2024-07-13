import axios from 'axios';

// redux actions
import { rootSlices } from './slices';

import { API_METHODS } from '../../app/api/constants';

const { actions } = rootSlices

const makeAPIRequest = (requestObj, payload, headers) => {
    if (requestObj?.method === API_METHODS.POST) {
      return axios.post(requestObj?.url, payload, {
        headers
      });
    } else if (requestObj?.method === API_METHODS.GET) {
      return axios.get(
        payload ? `${requestObj?.url}${payload}` : requestObj?.url
      );
    }
  };
  
  export const apiRequest = (requestObj, payload, headers={}) => (dispatch) => {
    return makeAPIRequest(requestObj, payload, headers)
      .then((response) => {
        if (requestObj?.redux) {
          dispatch(actions?.[requestObj?.redux]?.(response.data));
        }
        return response?.data;
      })
      .catch((error) => {
        return error?.response?.data;
      });
  };
