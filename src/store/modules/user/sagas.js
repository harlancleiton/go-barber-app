import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '../../../services/api';
import { updateProfileFailure, updateProfileSuccess } from './actions';

function* updateProfile({ payload }) {
  const { name, email, avatar_id, ...rest } = payload.data;

  const profile = { name, email, avatar_id, ...(rest.oldPassword ? rest : {}) };

  const response = yield call(api.put, 'users', profile);

  if (response.data.id) {
    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');
    yield put(updateProfileSuccess(response.data));
  } else if (response.data.errors) {
    Alert.alert(
      'Falha na atualização',
      `Isso pode ajudar: ${response.data.errors[0].message}`
    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
