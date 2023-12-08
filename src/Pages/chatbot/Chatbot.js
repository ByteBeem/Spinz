import ChatBot from 'react-simple-chatbot';

const steps = [
    {
        id: '0',
        message: 'welcome to spinz support group.',
        trigger: '1',
    },

    {
        id: '1',
        message: 'bye.',
        end: true,
    },
];

ReactDOM.render(
    <div>
        <ChatBot steps={steps}/>
    </div>,
    document.getElementById('root')
);