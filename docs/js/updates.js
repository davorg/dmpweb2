// Loads docs/data/updates.json and renders it into #updates-list.
// To add a new update, just add a new { date, title, paragraphs } entry
// to updates.json — no HTML editing needed. Newest first, sorted here
// so the JSON file itself doesn't have to be kept in order.

(function () {
  function formatUpdateDate(dateStr) {
    var d = new Date(dateStr + 'T00:00:00Z');
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    });
  }

  function renderUpdates(updates) {
    var container = document.getElementById('updates-list');
    if (!container) return;

    if (!Array.isArray(updates) || updates.length === 0) {
      container.innerHTML = '<p class="text-center">No updates yet — check back soon.</p>';
      return;
    }

    var sorted = updates.slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    container.innerHTML = sorted.map(function (update) {
      var paragraphs = (update.paragraphs || []).map(function (p) {
        return '<p>' + p + '</p>';
      }).join('');

      return (
        '<div class="update-item">' +
          '<div class="update-date">' + formatUpdateDate(update.date) + '</div>' +
          '<h4>' + update.title + '</h4>' +
          paragraphs +
        '</div>'
      );
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('updates-list');
    if (!container) return;

    fetch('data/updates.json')
      .then(function (res) {
        if (!res.ok) {
          throw new Error('Failed to load updates.json (' + res.status + ')');
        }
        return res.json();
      })
      .then(renderUpdates)
      .catch(function (err) {
        container.innerHTML = '<p class="text-center">Updates are currently unavailable.</p>';
        console.error(err);
      });
  });
})();
