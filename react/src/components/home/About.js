import React from 'react';
import './about.css'


const About = () => {
    return (
        <div className="about-container">
            <span className="about-header">About the developer...</span>
            <p>Maximos Salzman is a full-stack software developer from Athens, Ga. When he isn't coding, he's spending time with his kids and making art. Learn more about Maximos at <a className="link"href="https://www.linkedin.com/in/maximos-salzman-5a7050171/" target="_blank">LinkedIn</a> or <a className="link" href="https://github.com/Maximos-S/" target="_blank">GitHub</a>.</p>
        </div>
    );
};


export default About;