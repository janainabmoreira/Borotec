(function () {
  // Popula o campo GCLID via URL param ou sessionStorage
  var gclidEl = document.getElementById('gclid');
  if (gclidEl) {
    try {
      var params = new URLSearchParams(window.location.search);
      var val = params.get('gclid') || sessionStorage.getItem('gclid') || '';
      if (val) {
        gclidEl.value = val;
        sessionStorage.setItem('gclid', val);
      }
    } catch (e) {}
  }

  // Submissão via fetch ao Web3Forms
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = document.getElementById('submit-btn');

    var name = (document.getElementById('f-name') || {}).value || '';
    var email = (document.getElementById('f-email') || {}).value || '';
    var phone = (document.getElementById('f-phone') || {}).value || '';
    var company = (document.getElementById('f-company') || {}).value || '';
    var appEl = document.getElementById('f-application');
    var descEl = document.getElementById('f-description');

    if (!name.trim() || !email.trim() || !phone.trim() || !company.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    btn.disabled = true;
    var originalText = btn.innerHTML;
    btn.innerHTML = 'Enviando...';

    var key = form.dataset.key;
    var subject = form.dataset.subject;
    var source = form.dataset.source;
    var gclid = gclidEl ? gclidEl.value : '';

    var payload = {
      access_key: key,
      subject: subject,
      from_name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      application: appEl ? appEl.value : '',
      description: descEl ? descEl.value : '',
      source: source
    };
    if (gclid) payload.gclid = gclid;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          form.style.display = 'none';
          document.getElementById('form-success').style.display = 'block';
          if (window.dataLayer) window.dataLayer.push({ event: 'Formulario_lp_' + source });
        } else {
          throw new Error('fail');
        }
      })
      .catch(function () {
        alert('Erro ao enviar. Tente pelo WhatsApp.');
        btn.disabled = false;
        btn.innerHTML = originalText;
      });
  });
})();
