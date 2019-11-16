import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/Background';

const Profile = () => {
  return <Background />;
};

const ProfileTabBarIcon = ({ tintColor }) => (
  <Icon name="event" size={20} color={tintColor} />
);

Profile.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ProfileTabBarIcon,
};

ProfileTabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default Profile;
