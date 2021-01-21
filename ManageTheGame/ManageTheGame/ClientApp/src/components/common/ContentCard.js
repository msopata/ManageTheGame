import React, { Component, useEffect, useRef, useState } from 'react';
//import authService from './api-authorization/AuthorizeService';
import './ContentCard.css';

export const ContentCard = (props) => {

    return (
        <div className='mtg-content-card'>
            {props.title &&
                <div className="mtg-content-title">
                    <h3>{props.title && props.title}</h3>
                </div>
            }
           
            <div className="mtg-content-grid">
                {props.children}
            </div>
        </div>
    );
}
