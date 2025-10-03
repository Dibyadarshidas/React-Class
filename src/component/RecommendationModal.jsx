import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleModal, setPreferences, fetchRecommendations } from '../store/slices/recommendationSlice';

export const RecommendationModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal, loading } = useSelector(state => state.recommendations);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const onSubmit = (data) => {
    dispatch(setPreferences(data));
    dispatch(fetchRecommendations(data));
    dispatch(toggleModal());
    reset();
    setCurrentStep(1);
    navigate('/recommendations');
  };

  const handleClose = () => {
    dispatch(toggleModal());
    reset();
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">🎯 Get Personalized Recommendations</h2>
          <button onClick={handleClose} className="modal-close">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
          <p className="progress-text">Step {currentStep} of {totalSteps}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="recommendation-form">
            {/* Step 1: Mood & Event */}
            {currentStep === 1 && (
              <div className="form-step">
                <h3 className="step-title">How are you feeling today? 🎭</h3>
                
                <div className="form-group">
                  <label className="form-label">Current Mood</label>
                  <select 
                    {...register('mood', { required: 'Please select your mood' })}
                    className="form-control"
                  >
                    <option value="">Select your mood...</option>
                    <option value="happy">😊 Happy & Energetic</option>
                    <option value="sad">😢 Sad & Melancholic</option>
                    <option value="excited">🤩 Excited & Thrilled</option>
                    <option value="relaxed">😌 Relaxed & Calm</option>
                    <option value="romantic">💕 Romantic & Loving</option>
                    <option value="adventurous">🏔️ Adventurous & Bold</option>
                    <option value="nostalgic">📸 Nostalgic & Sentimental</option>
                  </select>
                  {errors.mood && <span className="error-message">{errors.mood.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">What's the occasion?</label>
                  <select 
                    {...register('event', { required: 'Please select an event' })}
                    className="form-control"
                  >
                    <option value="">Select an event...</option>
                    <option value="birthday">🎂 Birthday Celebration</option>
                    <option value="date">💕 Romantic Date</option>
                    <option value="family">👨‍👩‍👧‍👦 Family Time</option>
                    <option value="party">🎉 Party & Social</option>
                    <option value="holiday">🎄 Holiday & Festive</option>
                    <option value="workout">💪 Workout & Fitness</option>
                    <option value="study">📚 Study & Focus</option>
                    <option value="relax">🛋️ Relax & Unwind</option>
                  </select>
                  {errors.event && <span className="error-message">{errors.event.message}</span>}
                </div>
              </div>
            )}

            {/* Step 2: Preferences */}
            {currentStep === 2 && (
              <div className="form-step">
                <h3 className="step-title">Tell us your preferences 🎨</h3>
                
                <div className="form-group">
                  <label className="form-label">Movie Genre</label>
                  <select 
                    {...register('genre')}
                    className="form-control"
                  >
                    <option value="any">Any Genre</option>
                    <option value="action">🎬 Action & Adventure</option>
                    <option value="comedy">😂 Comedy & Humor</option>
                    <option value="drama">🎭 Drama & Romance</option>
                    <option value="horror">👻 Horror & Thriller</option>
                    <option value="sci-fi">🚀 Sci-Fi & Fantasy</option>
                    <option value="documentary">📺 Documentary</option>
                    <option value="animation">🎨 Animation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Cuisine Preference</label>
                  <select 
                    {...register('cuisine')}
                    className="form-control"
                  >
                    <option value="any">Any Cuisine</option>
                    <option value="italian">🍝 Italian</option>
                    <option value="mexican">🌮 Mexican</option>
                    <option value="asian">🍜 Asian</option>
                    <option value="indian">🍛 Indian</option>
                    <option value="american">🍔 American</option>
                    <option value="mediterranean">🥗 Mediterranean</option>
                    <option value="french">🥐 French</option>
                    <option value="thai">🌶️ Thai</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Time & Final Details */}
            {currentStep === 3 && (
              <div className="form-step">
                <h3 className="step-title">When are you planning this? ⏰</h3>
                
                <div className="form-group">
                  <label className="form-label">Time of Day</label>
                  <select 
                    {...register('timeOfDay', { required: 'Please select time of day' })}
                    className="form-control"
                  >
                    <option value="">Select time...</option>
                    <option value="morning">🌅 Morning (6 AM - 12 PM)</option>
                    <option value="afternoon">☀️ Afternoon (12 PM - 6 PM)</option>
                    <option value="evening">🌆 Evening (6 PM - 10 PM)</option>
                    <option value="night">🌙 Night (10 PM - 6 AM)</option>
                  </select>
                  {errors.timeOfDay && <span className="error-message">{errors.timeOfDay.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Any specific dietary requirements?</label>
                  <textarea 
                    {...register('dietaryRequirements')}
                    className="form-control"
                    rows="3"
                    placeholder="e.g., vegetarian, gluten-free, keto, etc. (optional)"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="modal-actions">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="btn btn-secondary">
                  ← Previous
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button type="button" onClick={nextStep} className="btn btn-primary">
                  Next →
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? '🎯 Getting Recommendations...' : '✨ Get My Recommendations'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
