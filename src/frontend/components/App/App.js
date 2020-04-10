import React from 'react';
import Form from '../Form/Form';

import './App.scss';
import sdgLogo from '../../images/sdgswheel.png';

const App = () => (
  <div>
    <div className="header container">
      <img src={sdgLogo} alt="sdg logo" />
      <h1>Covid-19 Estimator</h1>
      <p>Build for SDG Challenge.</p>{' '}
      <p>
        <a href="#covid-info">Click here to get more info on Covid-19</a>
      </p>
    </div>
    <div className="container main">
      <Form />
      <div className="info-container" id="covid-info">
        <div className="info-block">
          <h3>What is COVID-19?</h3>
          <p>
            COVID-19 is a disease caused by a new strain of coronavirus. ‘CO’
            stands for corona, ‘VI’ for virus, and ‘D’ for disease. Formerly,
            this disease was referred to as ‘2019 novel coronavirus’ or
            ‘2019-nCoV.’ The COVID-19 virus is a new virus linked to the same
            family of viruses as Severe Acute Respiratory Syndrome (SARS) and
            some types of common cold.
          </p>
        </div>
        <div className="info-block">
          <h3>What are the symptoms of COVID-19?</h3>
          <p>
            Symptoms can include fever, cough and shortness of breath. In more
            severe cases, infection can cause pneumonia or breathing
            difficulties. More rarely, the disease can be fatal. These symptoms
            are similar to the flu (influenza) or the common cold, which are a
            lot more common than COVID-19. This is why testing is required to
            confirm if someone has COVID-19.
          </p>
        </div>
        <div className="info-block">
          <h3> How does COVID-19 spread?</h3>
          <p>
            The virus is transmitted through direct contact with respiratory
            droplets of an infected person (generated through coughing and
            sneezing). Individuals can also be infected from and touching
            surfaces contaminated with the virus and touching their face (e.g.,
            eyes, nose, mouth). The COVID-19 virus may survive on surfaces for
            several hours, but simple disinfectants can kill it.
          </p>
        </div>
        <div className="info-block">
          <h3> Who is most at risk?</h3>
          <p>
            We are learning more about how COVID-19 affects people every
            day.  Older people, and people with chronic medical conditions, such
            as diabetes and heart disease, appear to be more at risk of
            developing severe symptoms.  As this is a new virus, we are still
            learning about how it affects children. We know it is possible for
            people of any age to be infected with the virus, but so far there
            are relatively few cases of COVID-19 reported among children. This
            is a new virus and we need to learn more about how it affects
            children. The virus can be fatal in rare cases, so far mainly among
            older people with pre-existing medical conditions.
          </p>
        </div>
        <div className="info-block">
          <h3>What is the treatment for COVID-19?</h3>
          <p>
            There is no currently available vaccine for COVID-19. However, many
            of the symptoms can be treated and getting early care from a
            healthcare provider can make the disease less dangerous. There are
            several clinical trials that are being conducted to evaluate
            potential therapeutics for COVID-19.
          </p>
        </div>
        <div className="info-block">
          <h3>How can the spread of COVID-19 be slowed down or prevented?</h3>
          <div>
            As with other respiratory infections like the flu or the common
            cold, public health measures are critical to slow the spread of
            illnesses. Public health measures are everyday preventive actions
            that include:
            <ul>
              <li>✓ staying home when sick;</li>
              <li>
                ✓ covering mouth and nose with flexed elbow or tissue when
                coughing or sneezing. Dispose of used tissue immediately;{' '}
              </li>
              <li>✓ washing hands often with soap and water; and </li>
              <li>✓ cleaning frequently touched surfaces and objects.</li>
            </ul>
            As we learn more about COVID-19 public health officials may
            recommend additional actions.
            <p>
              <strong>- World Health Organisation (WHO)</strong>
            </p>
          </div>
        </div>
         
      </div>
    </div>
    <div className="footer">
      <p>Developed by David Essien</p>
      <p>
        <a href="https://davidessien.com">https://davidessien.com</a>
      </p>
      <p>
        <a href=" https://github.com/davidshare">
          https://github.com/davidshare
        </a>
      </p>
    </div>
  </div>
);

export default App;
