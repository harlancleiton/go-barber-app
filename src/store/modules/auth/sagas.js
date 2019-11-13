import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import { singInSuccess, singFailure, singUpSuccess } from './actions';

export function* singIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert('Não autorizado', 'Usuario é prestador de serviço');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(singInSuccess(token, user));
  } catch (error) {
    Alert.alert('Falha na autenticação', 'Verifique suas credenciais');
    yield put(singFailure());
  }
}

export function* singUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
      provider: true,
    });

    yield put(singUpSuccess());
  } catch (error) {
    Alert.alert('Falha no cadastro', 'Verifique seus dados');
    yield put(singFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SING_IN_REQUEST', singIn),
  takeLatest('@auth/SING_UP_REQUEST', singUp),
]);
