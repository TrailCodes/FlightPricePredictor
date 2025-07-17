import React, { useState } from 'react';
import axios from 'axios';
import { FiArrowRight, FiCalendar, FiClock, FiMapPin, FiPhone, FiAward, FiCheckCircle, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import './App.css';

function FlightPricePredictor() {
  const [formData, setFormData] = useState({
    airline: '',
    source_city: '',
    departure_time: '',
    stops: '',
    arrival_time: '',
    destination_city: '',
    class: '',
    departure_date: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Hyderabad', 'Chennai'];
  const airlines = ['SpiceJet', 'AirAsia', 'Vistara', 'GO_FIRST', 'Indigo', 'Air_India'];
  const times = ['Early_Morning', 'Morning', 'Afternoon', 'Evening', 'Night', 'Late_Night'];
  const flightClasses = ['Economy', 'Business'];
  const stopsOptions = [
    { value: 'zero', label: 'Non-stop' },
    { value: 'one', label: '1 Stop' },
    { value: 'two_or_more', label: '2+ Stops' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear prediction when form changes
    if (prediction) setPrediction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.response?.data?.message || 'Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every(val => val !== '');

  return (
    <div className="glass-card">
      {/* Header Section */}
      <div className="header-section">
        <div className="airline-icon">
          <FiTrendingUp size={28} />
        </div>
        <div className="header-content">
          <h1 className="app-title">Flight <span className="highlight">Price Predictor</span></h1>
          <p className="app-subtitle">
            Get accurate flight price estimates based on historical data and current trends
          </p>
        </div>
      </div>

      {/* Main Form Section */}
      <form onSubmit={handleSubmit} className="prediction-form">
        <div className="form-section">
          <h3 className="section-title">
            <FiCalendar className="section-icon" />
            Flight Details
          </h3>
          
          <div className="form-grid">
            {/* Airline */}
            <div className="input-group">
              <label className="input-label">Airline</label>
              <div className="select-wrapper">
                <select
                  name="airline"
                  value={formData.airline}
                  onChange={handleChange}
                  className="styled-select"
                  required
                >
                  <option value="">Select Airline</option>
                  {airlines.map(airline => (
                    <option key={airline} value={airline}>
                      {airline.replace('_', ' ')}
                    </option>
                  ))}
                </select>
                <div className="select-arrow" />
              </div>
            </div>

            {/* Source City */}
            <div className="input-group">
              <label className="input-label">Source City</label>
              <div className="select-wrapper">
                <select
                  name="source_city"
                  value={formData.source_city}
                  onChange={handleChange}
                  className="styled-select"
                  required
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <div className="select-arrow" />
              </div>
            </div>

            {/* Destination City */}
            <div className="input-group">
              <label className="input-label">Destination City</label>
              <div className="select-wrapper">
                <select
                  name="destination_city"
                  value={formData.destination_city}
                  onChange={handleChange}
                  className="styled-select"
                  required
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <div className="select-arrow" />
              </div>
            </div>

            {/* Departure Date */}
            <div className="input-group">
              <label className="input-label">Departure Date</label>
              <div className="input-with-icon">
                <FiCalendar className="input-icon" />
                <input
                  type="date"
                  name="departure_date"
                  value={formData.departure_date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="styled-input"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">
            <FiClock className="section-icon" />
            Flight Schedule
          </h3>
          
          <div className="form-grid">
            {/* Departure Time */}
            <div className="input-group">
              <label className="input-label">Departure Time</label>
              <div className="select-wrapper">
                <select
                  name="departure_time"
                  value={formData.departure_time}
                  onChange={handleChange}
                  className="styled-select"
                  required
                >
                  <option value="">Select Time</option>
                  {times.map(time => (
                    <option key={time} value={time}>
                      {time.replace('_', ' ')}
                    </option>
                  ))}
                </select>
                <div className="select-arrow" />
              </div>
            </div>

            {/* Arrival Time */}
            <div className="input-group">
              <label className="input-label">Arrival Time</label>
              <div className="select-wrapper">
                <select
                  name="arrival_time"
                  value={formData.arrival_time}
                  onChange={handleChange}
                  className="styled-select"
                  required
                >
                  <option value="">Select Time</option>
                  {times.map(time => (
                    <option key={time} value={time}>
                      {time.replace('_', ' ')}
                    </option>
                  ))}
                </select>
                <div className="select-arrow" />
              </div>
            </div>

            {/* Stops */}
            <div className="input-group">
              <label className="input-label">Number of Stops</label>
              <div className="select-wrapper">
                <select
                  name="stops"
                  value={formData.stops}
                  onChange={handleChange}
                  className="styled-select"
                  required
                >
                  <option value="">Select Stops</option>
                  {stopsOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="select-arrow" />
              </div>
            </div>

            {/* Class */}
            <div className="input-group">
              <label className="input-label">Class</label>
              <div className="select-wrapper">
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="styled-select"
                  required
                >
                  <option value="">Select Class</option>
                  {flightClasses.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                <div className="select-arrow" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="predict-button"
          disabled={!isFormValid || loading}
        >
          <div className="button-content">
            {loading ? (
              <>
                <span className="spinner" />
                Predicting...
              </>
            ) : (
              <>
                Predict Flight Price
                <FiArrowRight className="button-icon" />
              </>
            )}
          </div>
        </button>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <div className="error-icon">
              <FiAlertCircle size={16} />
            </div>
            <div className="error-text">{error}</div>
          </div>
        )}
      </form>

      {/* Results Section */}
      <div className={`results-section ${prediction ? 'visible' : ''}`}>
        <div className="prediction-result">
          <div className="result-header">
            <FiCheckCircle className="result-icon" />
            <h3>Estimated Flight Price</h3>
          </div>
          
          <div className="price-display">
            ₹{prediction ? Math.round(prediction).toLocaleString() : '0'}
          </div>
          
          <div className="price-breakdown">
            <div className="breakdown-item">
              <div className="breakdown-label">Airline</div>
              <div className="breakdown-value">{formData.airline.replace('_', ' ')}</div>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-label">Route</div>
              <div className="breakdown-value">{formData.source_city} → {formData.destination_city}</div>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-label">Class</div>
              <div className="breakdown-value">{formData.class}</div>
            </div>
            <div className="breakdown-item">
              <div className="breakdown-label">Stops</div>
              <div className="breakdown-value">
                {formData.stops === 'zero' ? 'Non-stop' : 
                 formData.stops === 'one' ? '1 Stop' : '2+ Stops'}
              </div>
            </div>
          </div>
          
          <div className="price-trend">
            <div className="trend-indicator up">
              <FiTrendingUp size={14} style={{ marginRight: '4px' }} />
              Price trend: Average for this route
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h3 className="features-title">Why Choose Our Predictor?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FiAward size={24} />
            </div>
            <h4>Accurate Predictions</h4>
            <p>Our advanced algorithms analyze thousands of data points to give you the most accurate price estimates.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FiClock size={24} />
            </div>
            <h4>Real-time Data</h4>
            <p>We constantly update our models with the latest flight pricing trends and patterns.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FiMapPin size={24} />
            </div>
            <h4>Comprehensive Coverage</h4>
            <p>All major airlines and routes across India with detailed breakdowns.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightPricePredictor;