import { useState } from 'react';
import { FormStyles, Label, AddContactButton } from './ContactForm.styled';
import PropTypes from 'prop-types';
import { Input } from 'components/Filter/Filter.styled';

export function Form({ onChange, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const handleChange = e => {
    const { value, name } = e.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };
  const onFormSubmit = e => {
    e.preventDefault();
    const contactMap = onSubmit.map(contact => {
      if (name === contact.name) {
        alert(`${contact.name} is already in contacts`);
        return false;
      }
      if (number === contact.number) {
        alert(`Number "${contact.number}" is already in contacts`);
        return false;
      }
      return true;
    });

    if (contactMap.every(el => el === true)) {
      onChange(name, number);
    }
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormStyles onSubmit={onFormSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </Label>
      <AddContactButton type="submit">Add to contact list</AddContactButton>
    </FormStyles>
  );
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
