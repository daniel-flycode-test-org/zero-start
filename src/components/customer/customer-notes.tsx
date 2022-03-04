import { useEffect, useState } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import type { CustomerNote as CustomerNoteInterface } from '../../types/customer';
import { generateResourceId } from '../../utils/generate-resource-id';
import { CustomerNote } from './customer-note';
import { CustomerNoteAdd } from './customer-note-add';

interface CustomerNotesProps {
  notes: CustomerNoteInterface[];
}

export const CustomerNotes: FC<CustomerNotesProps> = (props) => {
  const { notes: notesProp, ...other } = props;
  const [notes, setNotes] = useState<CustomerNoteInterface[]>(notesProp || []);

  const handleNoteSend = (content: string): void => {
    setNotes((prevNotes) => [
      {
        id: generateResourceId(),
        senderId: '1',
        senderName: 'Chen Simmons',
        senderAvatar: '/static/user-chen_simmons.png',
        content,
        createdAt: new Date()
      },
      ...prevNotes
    ]);
  };

  const handleNoteDelete = (noteId: string): void => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  useEffect(() => {
    setNotes(notesProp);
  }, [notesProp]);

  return (
    <Box {...other}>
      <Typography color="textPrimary" variant="h6" sx={{ mb: 3 }}>
        Team Notes
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3
        }}
      >
        <CustomerNoteAdd onSend={handleNoteSend} />
        {notes.map((note) => (
          <CustomerNote
            content={note.content}
            createdAt={note.createdAt}
            deletable={note.senderId === '1'} // NOTE: ID 1 is the logged in user
            id={note.id}
            key={note.id}
            onDelete={handleNoteDelete}
            senderAvatar={note.senderAvatar}
            senderName={note.senderName}
          />
        ))}
      </Box>
    </Box>
  );
};

CustomerNotes.defaultProps = {
  notes: []
};

CustomerNotes.propTypes = {
  notes: PropTypes.array
};
