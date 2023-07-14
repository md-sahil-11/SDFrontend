import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function UserAvatars({users, total}) {
  return (
    <AvatarGroup total={total}>
      {users?.members?.map((user, idx) => (
        <Avatar key={idx} alt={user?.name} src={user?.image} />
      ))}
    </AvatarGroup>
  );
}