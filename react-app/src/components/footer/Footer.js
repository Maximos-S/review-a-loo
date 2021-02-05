import React from 'react';
import {AiFillLinkedin, AiFillGithub} from 'react-icons/ai'
import './footer.css'


const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-border"></div> 
            <div className="footer-header">Review-a-Loo...</div>
            <p>...was created by <a href="https://maximos-s.github.io" target="_blank" rel="noopener noreferrer">Maximos Salzman.</a></p>
            <div class="link-icons">
                <a href="https://github.com/Maximos-S" target="_blank" rel="noopener noreferrer"><AiFillGithub /></a>
                <a href="https://www.linkedin.com/in/maximos-salzman-5a7050171/" target="_blank" rel="noopener noreferrer"><AiFillLinkedin /></a>
            </div>

        </div>
    );
};


export default Footer;