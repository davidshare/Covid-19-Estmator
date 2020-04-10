import React, { Component } from 'react';

import './Form.scss';
import covid19ImpactEstimator from '../../../estimator';
import Modal from '../Modal/Modal';
import {
  formatData,
  convertObjectToArrayOfObjects
} from '../../../helpers/helpers';
import Impact from '../Impact/Impact';

class Form extends Component {
  state = {
    name: '',
    avgAge: '',
    avgDailyIncomeInUSD: '',
    avgDailyIncomePopulation: '',
    population: '',
    periodType: '',
    reportedCases: '',
    timeToElapse: '',
    totalHospitalBeds: '',
    show: false
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showResult = (resultObject) => {
    const data = formatData(resultObject);

    const estimation = covid19ImpactEstimator(data);
    this.setState({ impact: convertObjectToArrayOfObjects(estimation.impact) });
    this.setState({
      severeImpact: convertObjectToArrayOfObjects(estimation.severeImpact)
    });
    this.showModal();
  };

  showError = () => {
    this.setState({
      error: 'There was an error with processing your data, please try again.'
    });
    this.showModal();
  };

  validateInput = (inputObject) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const i in inputObject) {
      if (!inputObject[i] && i !== 'show') {
        return false;
      }
    }
    return true;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateInput(this.state)) {
      this.showResult(this.state);
    } else {
      this.showError();
    }
  };

  render() {
    return (
      <>
        {this.state.show && (
          <Modal closeModal={this.hideModal} show={this.state.show}>
            {this.state.impact && this.state.severeImpact && (
              <div className="modal-content">
                <Impact impact={this.state.impact} />
                <Impact impact={this.state.severeImpact} />
              </div>
            )}

            {this.state.error && <p>{this.state.error}</p>}
          </Modal>
        )}
        <form>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="avgAge">Average Age</label>
            <input
              type="text"
              name="avgAge"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="avgDailyIncomeInUSD">
              Average Daily Income in USD
            </label>
            <input
              type="text"
              name="avgDailyIncomeInUSD"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="avgDailyIncomePopulation">
              Average Daily Income Population
            </label>
            <input
              type="text"
              name="avgDailyIncomePopulation"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="population">Population</label>
            <input
              type="text"
              name="population"
              data-population
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="periodType">Period Type</label>
            <select
              name="periodType"
              onChange={this.handleChange}
              required
              data-period-type
            >
              <option value="">Select the period type</option>
              <option value="days">Days</option>
              <option value="weeks">weeks</option>
              <option value="months">Months</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="reportedCases">Reported Cases</label>
            <input
              type="text"
              name="reportedCases"
              data-reported-cases
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="timeToElapse">Time to elapse</label>
            <input
              type="text"
              name="timeToElapse"
              data-time-to-elapse
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="totalHospitalBeds">Total Hospital Beds</label>
            <input
              type="text"
              name="totalHospitalBeds"
              data-total-hospital-beds
              onChange={this.handleChange}
              required
            />
          </div>
          <button data-go-estimate onClick={this.handleSubmit}>
            Perform Analysis
          </button>
        </form>
      </>
    );
  }
}

export default Form;
