document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Active link highlighting
        navLinks.forEach(ln => ln.classList.remove('active'));
        link.classList.add('active');

        // Close menu
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Scroll Reveal Animation (Intersection Observer)
  const fadeElements = document.querySelectorAll('.animate-fade-in');
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // 4. Stats Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = Math.max(Math.floor(duration / target), 10);
    let current = 0;
    
    // Adjust increments for larger numbers to maintain constant duration
    const increment = target > 100 ? Math.ceil(target / 100) : 1;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + (target === 100 ? '%' : '+');
        clearInterval(timer);
      } else {
        element.textContent = current + '+';
      }
    }, stepTime);
  };

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(num => countUp(num));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // 5. Interactive BMI Calculator
  const btnCalculateBmi = document.getElementById('btnCalculateBmi');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const bmiResultBox = document.getElementById('bmiResultBox');
  const bmiVal = document.getElementById('bmiVal');
  const bmiCat = document.getElementById('bmiCat');
  const bmiAdvice = document.getElementById('bmiAdvice');

  if (btnCalculateBmi) {
    btnCalculateBmi.addEventListener('click', () => {
      const height = parseFloat(heightInput.value);
      const weight = parseFloat(weightInput.value);

      if (!height || !weight || height <= 0 || weight <= 0) {
        alert('Please enter valid positive values for Height and Weight.');
        return;
      }

      // Formula: BMI = weight (kg) / [height (m)]^2
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

      bmiVal.textContent = bmi;
      
      let category = '';
      let advice = '';
      let colorClass = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        advice = 'Focus on nutrient-dense foods and a progressive hypertrophy program to build strength safely.';
        colorClass = '#ffaa00';
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal Weight';
        advice = 'Excellent work! Maintain your balance of strength training, proper recovery, and cardio conditioning.';
        colorClass = '#00ffaa';
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        category = 'Overweight';
        advice = 'Consider incorporating more high-intensity functional training and coordinating custom caloric plans with our nutritionist.';
        colorClass = '#ff7700';
      } else {
        category = 'Obese';
        advice = 'Prioritize safe cardiovascular sessions, guided strength training, and contact our in-house nutritionist to formulate a long-term plan.';
        colorClass = '#ff3300';
      }

      bmiCat.textContent = category;
      bmiCat.style.color = colorClass;
      bmiAdvice.textContent = advice;

      // Animate displaying results
      bmiResultBox.style.display = 'block';
      bmiResultBox.style.opacity = 0;
      bmiResultBox.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        bmiResultBox.style.transition = 'all 0.4s ease';
        bmiResultBox.style.opacity = 1;
        bmiResultBox.style.transform = 'translateY(0)';
      }, 50);
    });
  }

  // 6. Lead Contact Form Simulation
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Loading State
      submitBtn.textContent = 'Enrolling...';
      submitBtn.disabled = true;
      formMessage.style.display = 'none';

      // Simulate API submit latency
      setTimeout(() => {
        const nameVal = document.getElementById('name').value;
        
        // Reset Button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Display Success Response
        formMessage.className = 'form-message success';
        formMessage.textContent = `Thank you, ${nameVal}! Your enrollment request has been logged. A certified trainer will call or email you within 24 hours.`;
        formMessage.style.display = 'block';

        // Clear Form
        contactForm.reset();
      }, 1500);
    });
  }
});
