# Contributing to Water Quality Monitoring System

Thank you for your interest in contributing to the Water Quality Monitoring System! This document provides guidelines and best practices for contributors.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

This project is committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## Getting Started

1. Fork the repository on GitHub
2. Clone your forked repository locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/water-quality-monitoring.git
   cd water-quality-monitoring
   ```
3. Follow the setup instructions in `DEVELOPMENT_WORKFLOW.md`
4. Create a new branch for your contribution:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How to Contribute

### Types of Contributions

#### 🐛 Bug Reports
- Use the GitHub issue template
- Include steps to reproduce
- Provide system information
- Add screenshots if applicable

#### 💡 Feature Requests
- Describe the problem you're solving
- Explain the proposed solution
- Consider alternative approaches
- Discuss potential impacts

#### 🔧 Code Contributions
- Bug fixes
- New features
- Performance improvements
- Code refactoring
- Documentation updates

#### 📚 Documentation
- API documentation
- User guides
- Code comments
- README improvements

## Pull Request Process

### Before Submitting

1. **Test your changes**:
   ```bash
   cd backend
   node test_api.js
   node test_gemini.js
   ```

2. **Check code style**:
   - Follow existing code patterns
   - Use consistent naming conventions
   - Add appropriate comments

3. **Update documentation**:
   - Update README if needed
   - Add/update code comments
   - Update API documentation

### Submitting a Pull Request

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "type(scope): descriptive message"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**:
   - Use the provided PR template
   - Link related issues
   - Describe changes made
   - Include testing information

### Commit Message Format

Use conventional commits format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(api): add water quality severity classification
fix(frontend): resolve location detection issue
docs(readme): update installation instructions
```

## Coding Standards

### Backend (Node.js)

#### File Structure
- Keep related functions together
- Use meaningful file names
- Separate concerns appropriately

#### Code Style
```javascript
// Use async/await instead of callbacks
async function analyzeWaterQuality(data) {
  try {
    const result = await geminiAnalysis(data);
    return result;
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('Failed to analyze water quality');
  }
}

// Use descriptive variable names
const waterQualityReport = {
  location: userLocation,
  severity: analysisSeverity,
  recommendation: safetyRecommendation
};

// Add input validation
function validateReportData(data) {
  if (!data.location || !data.description) {
    throw new Error('Location and description are required');
  }
  // Additional validation...
}
```

#### Error Handling
- Use try-catch blocks for async operations
- Provide meaningful error messages
- Log errors appropriately
- Return proper HTTP status codes

### Frontend (JavaScript)

#### Code Style
```javascript
// Use const/let instead of var
const API_ENDPOINT = 'http://localhost:3000/api';
let currentLocation = null;

// Use arrow functions for short functions
const handleSubmit = async (event) => {
  event.preventDefault();
  // Handle form submission
};

// Use template literals
const errorMessage = `Failed to submit report: ${error.message}`;

// Use meaningful CSS classes
document.querySelector('.water-quality-form').classList.add('loading');
```

#### DOM Manipulation
- Use modern DOM methods
- Add proper event listeners
- Handle errors gracefully
- Provide user feedback

### CSS/Styling

#### Best Practices
- Use semantic class names
- Follow mobile-first approach
- Use CSS Grid/Flexbox for layouts
- Maintain consistent spacing
- Follow accessibility guidelines

```css
/* Good: Semantic class names */
.water-report-form { }
.severity-indicator { }
.submit-button { }

/* Good: Mobile-first responsive design */
.report-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .report-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
```

## Testing Guidelines

### Backend Testing

#### Unit Tests
```javascript
// Test individual functions
describe('Water Quality Analysis', () => {
  test('should classify urgent severity correctly', async () => {
    const mockData = {
      description: 'Water is brown and smells bad',
      location: 'Test Location'
    };
    
    const result = await analyzeTextWithGemini(mockData.description);
    expect(result.severity).toBe('urgent');
  });
});
```

#### Integration Tests
```javascript
// Test API endpoints
describe('Report API', () => {
  test('POST /api/report should return analysis', async () => {
    const response = await request(app)
      .post('/api/report')
      .field('location', 'Test Location')
      .field('description', 'Test description')
      .expect(200);
      
    expect(response.body.analysis).toBeDefined();
  });
});
```

### Frontend Testing

#### Manual Testing Checklist
- [ ] Form validation works correctly
- [ ] File upload functions properly
- [ ] Location detection works
- [ ] Error messages display correctly
- [ ] Responsive design works on mobile
- [ ] Accessibility features function

## Documentation

### Code Documentation

#### Function Comments
```javascript
/**
 * Analyzes water quality report using Gemini AI
 * @param {string} description - User's description of water issue
 * @returns {Promise<Object>} Analysis result with severity and suggestion
 * @throws {Error} When API call fails or response is invalid
 */
async function analyzeTextWithGemini(description) {
  // Implementation...
}
```

#### API Documentation
Document all endpoints:
```javascript
/**
 * @api {post} /api/report Submit Water Quality Report
 * @apiName SubmitReport
 * @apiGroup Reports
 * 
 * @apiParam {String} location Location of the water source
 * @apiParam {String} description Description of the water issue
 * @apiParam {File} [photo] Optional photo of the water
 * 
 * @apiSuccess {String} severity Issue severity (urgent/medium/low)
 * @apiSuccess {String} suggestion Safety recommendation
 * 
 * @apiError {String} error Error message
 */
```

### README Updates

When adding features, update:
- Installation instructions
- Usage examples
- API documentation
- Configuration options
- Troubleshooting section

## Review Process

### Pull Request Reviews

Reviewers will check for:
- Code quality and consistency
- Test coverage
- Documentation updates
- Performance implications
- Security considerations
- Accessibility compliance

### Feedback and Iterations

- Address reviewer comments promptly
- Ask questions if feedback is unclear
- Make requested changes in new commits
- Update PR description if scope changes

## Community

### Getting Help

- Create GitHub issues for bugs
- Start discussions for feature ideas
- Join community chat (if available)
- Check existing documentation first

### Recognition

Contributors will be recognized:
- In the project README
- In release notes
- Through GitHub contributor statistics

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to making water quality monitoring more accessible and effective! 🚰💧
