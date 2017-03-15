import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import {
  withKnobs,
  text, boolean, number, object
} from '@kadira/storybook-addon-knobs';

const stories = storiesOf('Storybook Knobs', module);

// Add the `withKnobs` decorator to add knobs support to your stories.
// You can also configure `withKnobs` as a global decorator.
stories.addDecorator(withKnobs);

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>
      Hello World!
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));


// Knobs examples
// https://github.com/storybooks/storybook-addon-knobs

// Knobs for React props
stories.add('with a button', () => (
  <button
    disabled={boolean('Disabled', false)}
  >
    {text('Label', 'Hello Button')}
  </button>
));


stories.add('with another button', () => {
  const style = {
    backgroundColor: '#FFF',
    border: '1px solid #DDD',
    borderRadius: 2,
    outline: 0,
    fontSize: 15,
    cursor: 'pointer',
  };

  return (
    <button
      disabled={boolean('Disabled', true)}
      style={object('Style', style)}
    >
      {text('Label', 'Hello Button')}
    </button>
  );
});

stories.add('with some text', () => {
  let content = text('Content', 'This is the content');
  content = content.replace(/\n/g, '<br />');

  return (
    <div
      dangerouslySetInnerHTML={{__html: content}}
    />
  );
});

stories.add('as dynamic variables', () => {
  const name = text('Name', 'Arunoda Susiripala');
  const age = number('Age', 89);

  const content = `I am ${name} and I'm ${age} years old.`;
  return (<div>{content}</div>);
});
