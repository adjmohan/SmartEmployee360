import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReviewModal = ({ isOpen, onClose, employee, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [reviewData, setReviewData] = useState({
    goals: [],
    competencies: {},
    managerFeedback: '',
    peerFeedback: [],
    overallRating: 0,
    developmentPlan: ''
  });

  const steps = [
    { id: 1, title: 'Goal Setting', icon: 'Target' },
    { id: 2, title: 'Competency Assessment', icon: 'CheckSquare' },
    { id: 3, title: 'Manager Feedback', icon: 'MessageSquare' },
    { id: 4, title: 'Peer Input', icon: 'Users' },
    { id: 5, title: 'Overall Rating', icon: 'Star' }
  ];

  const competencyAreas = [
    { id: 'technical', label: 'Technical Skills', description: 'Job-specific technical competencies' },
    { id: 'communication', label: 'Communication', description: 'Verbal and written communication skills' },
    { id: 'leadership', label: 'Leadership', description: 'Leadership and team management abilities' },
    { id: 'problemSolving', label: 'Problem Solving', description: 'Analytical and problem-solving skills' },
    { id: 'collaboration', label: 'Collaboration', description: 'Teamwork and collaboration skills' },
    { id: 'adaptability', label: 'Adaptability', description: 'Flexibility and adaptability to change' }
  ];

  const ratingOptions = [
    { value: 1, label: '1 - Below Expectations' },
    { value: 2, label: '2 - Meets Some Expectations' },
    { value: 3, label: '3 - Meets Expectations' },
    { value: 4, label: '4 - Exceeds Expectations' },
    { value: 5, label: '5 - Outstanding' }
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    onSave(reviewData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Goal Setting & Achievement</h3>
              <p className="text-muted-foreground mb-6">Review and assess the employee's goals for this period.</p>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((goalNum) => (
                <div key={goalNum} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">Goal {goalNum}</h4>
                    <Select
                      options={[
                        { value: 'achieved', label: 'Achieved' },
                        { value: 'partially', label: 'Partially Achieved' },
                        { value: 'not_achieved', label: 'Not Achieved' }
                      ]}
                      placeholder="Select status"
                      className="w-48"
                    />
                  </div>
                  <Input
                    label="Goal Description"
                    placeholder="Enter goal description..."
                    className="mb-3"
                  />
                  <Input
                    label="Comments"
                    placeholder="Add comments on achievement..."
                    className="mb-3"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Competency Assessment</h3>
              <p className="text-muted-foreground mb-6">Rate the employee's performance in key competency areas.</p>
            </div>
            
            <div className="space-y-4">
              {competencyAreas.map((competency) => (
                <div key={competency.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{competency.label}</h4>
                      <p className="text-sm text-muted-foreground">{competency.description}</p>
                    </div>
                    <Select
                      options={ratingOptions}
                      placeholder="Rate"
                      className="w-48"
                    />
                  </div>
                  <Input
                    placeholder="Add specific feedback..."
                    className="mt-3"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Manager Feedback</h3>
              <p className="text-muted-foreground mb-6">Provide comprehensive feedback on the employee's performance.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Strengths</label>
                <textarea
                  className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                  placeholder="Highlight the employee's key strengths and achievements..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Areas for Improvement</label>
                <textarea
                  className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                  placeholder="Identify areas where the employee can improve..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Development Recommendations</label>
                <textarea
                  className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                  placeholder="Suggest specific development activities or training..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Peer Input Collection</h3>
              <p className="text-muted-foreground mb-6">Gather feedback from colleagues and team members.</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">JS</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">John Smith</div>
                    <div className="text-sm text-muted-foreground">Senior Developer</div>
                  </div>
                </div>
                <p className="text-sm text-foreground">"Excellent collaboration skills and always willing to help team members. Shows strong technical leadership."</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">MJ</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Maria Johnson</div>
                    <div className="text-sm text-muted-foreground">Product Manager</div>
                  </div>
                </div>
                <p className="text-sm text-foreground">"Great communication skills and consistently delivers high-quality work on time. Very reliable team member."</p>
              </div>
              
              <Button variant="outline" className="w-full">
                <Icon name="Plus" size={16} className="mr-2" />
                Request Additional Feedback
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Overall Rating & Summary</h3>
              <p className="text-muted-foreground mb-6">Provide an overall performance rating and summary.</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Overall Performance Rating</label>
                <div className="flex items-center space-x-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        reviewData.overallRating >= rating
                          ? 'border-warning bg-warning text-warning-foreground'
                          : 'border-border text-muted-foreground hover:border-warning'
                      }`}
                      onClick={() => setReviewData({ ...reviewData, overallRating: rating })}
                    >
                      <Icon name="Star" size={20} className={reviewData.overallRating >= rating ? 'fill-current' : ''} />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {reviewData.overallRating > 0 && ratingOptions.find(opt => opt.value === reviewData.overallRating)?.label}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Performance Summary</label>
                <textarea
                  className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                  placeholder="Provide an overall summary of the employee's performance..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Development Plan for Next Period</label>
                <textarea
                  className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={4}
                  placeholder="Outline development goals and plans for the next review period..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Performance Review</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {employee?.name} - {employee?.department}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 ${
                  currentStep === step.id ? 'text-primary' : 
                  currentStep > step.id ? 'text-success' : 'text-muted-foreground'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    currentStep === step.id ? 'border-primary bg-primary text-primary-foreground' :
                    currentStep > step.id ? 'border-success bg-success text-success-foreground': 'border-muted-foreground'
                  }`}>
                    {currentStep > step.id ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={step.icon} size={16} />
                    )}
                  </div>
                  <span className="text-sm font-medium hidden md:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <Icon name="ChevronLeft" size={16} className="mr-2" />
            Previous
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Save Draft
            </Button>
            {currentStep === steps.length ? (
              <Button onClick={handleSave}>
                <Icon name="Check" size={16} className="mr-2" />
                Complete Review
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <Icon name="ChevronRight" size={16} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;