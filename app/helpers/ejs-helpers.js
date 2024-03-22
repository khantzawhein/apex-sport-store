function shortenString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + '...';
  }
}

function formatDateTime(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  return date.toLocaleDateString(null, options);
}

function gravatar(email) {
  const { createHash } = require('crypto');
  return `https://gravatar.com/avatar/${createHash('sha256').update(email.trim().toLowerCase()).digest('hex')}`;
}

module.exports = {
  shortenString,
  formatDateTime,
  gravatar
};
