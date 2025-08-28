// script.js
document.addEventListener('DOMContentLoaded', () => {
  const locationInput = document.getElementById('location');
  const locationStatus = document.getElementById('locationStatus');

  // Automatic location detection
  if (navigator.geolocation) {
    locationStatus.textContent = 'Detecting your location...';
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Optionally, reverse geocode to get address
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          if (data.display_name) {
            locationInput.value = data.display_name;
            locationStatus.textContent = 'Location detected!';
          } else {
            locationInput.value = `${latitude},${longitude}`;
            locationStatus.textContent = 'Location detected (coordinates only).';
          }
        } catch {
          locationInput.value = `${latitude},${longitude}`;
          locationStatus.textContent = 'Location detected (coordinates only).';
        }
      },
      (err) => {
        locationStatus.textContent = 'Could not detect location. Please enable location services.';
      }
    );
  } else {
    locationStatus.textContent = 'Geolocation not supported by your browser.';
  }
});

document.getElementById('reportForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  document.getElementById('result').innerHTML = '<span style="color: #1976d2;">Analyzing with AI...</span>';
  
  try {
    console.log('Submitting form data...');
    const response = await fetch('http://localhost:3000/api/report', {
      method: 'POST',
      body: formData
    });
    
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    
    if (data.status === 'analyzed') {
      let resultHTML = '<h3 style="color: #1976d2; margin-bottom: 10px;">AI Analysis Results</h3>';
      
      // Text analysis
      let severityColor = data.textAnalysis.severity === 'urgent' ? '#d32f2f' : 
                          data.textAnalysis.severity === 'medium' ? '#f57c00' : '#388e3c';
      
      resultHTML += `<div style="background: #0f0114ff; padding: 15px; margin: 10px 0; border-radius: 5px;">
        <h4 style="color: ${severityColor}; margin-top: 0;">Severity Level: ${data.textAnalysis.severity.toUpperCase()}</h4>
        <p><strong>Safety Recommendation:</strong> ${data.textAnalysis.suggestion}</p>
      </div>`;
      
      // Image analysis (if photo was uploaded)
      if (data.data && data.data.photo) {
        resultHTML += `<div style="background: #0f0e0eff; padding: 15px; margin: 10px 0; border-radius: 5px;">
          <h4 style="color: #1976d2; margin-top: 0;">Water Quality from Photo:</h4>
          <p><strong>Classification:</strong> ${data.imageAnalysis.class}</p>
        </div>`;
      }
      
      document.getElementById('result').innerHTML = resultHTML;
      form.reset();
    } else {
      document.getElementById('result').innerHTML = '<span style="color: #d32f2f;">Analysis failed. Please try again.</span>';
    }
  } catch (err) {
    console.error('Error details:', err);
    document.getElementById('result').innerHTML = '<span style="color: #d32f2f;">Error submitting report: ' + err.message + '</span>';
  }
});