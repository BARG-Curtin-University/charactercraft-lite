// generation.js - ES6+ version
import { log, logError } from './utils.js';
import { collectFormData } from './rag-ui.js';

log("✅ generatePersonality loaded");

/**
 * Creates a single summary item for the personality profile
 * @param {string} label - The label for the summary item
 * @param {string} value - The value to display for the summary item
 * @returns {string} HTML string representing a summary item
 */
function createSummaryItem(label, value) {
  return `<div class="summary-item"><span class="label">${label}:</span> <span class="value">${value}</span></div>`;
}

// Make the helper function globally available for standalone version
if (typeof window !== 'undefined') {
  window.createSummaryItem = createSummaryItem;
}

/**
 * Generates a personality profile based on form inputs or random values
 * Collects form data, generates summary and description, and updates the UI
 * @returns {void}
 */
export function generatePersonality() {
  try {
    log("🧠 Generating personality profile");
    const profileData = collectFormData();
    log("📊 Collected form data:", profileData);
    generateSummary(profileData);
    generateDescription(profileData);
    
    // Show the output card
    const formCard = document.querySelector('.form-card');
    const outputCard = document.querySelector('.output-card');
    
    if (formCard) formCard.style.display = 'none';
    if (outputCard) outputCard.classList.add('visible');
    
    log("✅ Personality profile generated successfully");
  } catch (error) {
    logError("❌ Error generating personality profile:", error);
  }
}

// Make the function globally available for standalone version
if (typeof window !== 'undefined') {
  window.generatePersonality = generatePersonality;
}

/**
 * Generates the summary HTML and updates the DOM
 * @param {Object} data - The personality profile data
 * @param {string} [data.characterName] - Character name
 * @param {string} [data.characterGender] - Character gender
 * @param {string} [data.characterAge] - Character age range
 * @param {string} [data.characterRole] - Character's organisational role
 * @param {string} [data.orgType] - Type of organisation
 * @param {string} [data.orgName] - Name of organisation
 * @param {string} [data.audience] - Primary audience
 * @param {string} [data.obTheories] - Organisational behaviour theories
 * @param {string} [data.communicationStyle] - Communication style
 * @param {string} [data.conflictResolution] - Conflict resolution approach
 * @param {string} [data.negotiationMethod] - Negotiation method
 * @param {string} [data.decisionMaking] - Decision-making approach
 * @param {string} [data.emotionalIntelligence] - Emotional intelligence level
 * @param {string} [data.feedbackMechanism] - Feedback mechanism
 * @param {string} [data.coreValues] - Core values
 * @returns {void}
 */
export function generateSummary(data) {
  const items = [
    ['Character Name', data.characterName],
    ['Gender', data.characterGender],
    ['Age Range', data.characterAge],
    ['Organisational Role', data.characterRole],
    ['Organisation Type', data.orgType],
    ['Organisation Name', data.orgName],
    ['Primary Audience', data.audience],
    ['OB Theories', data.obTheories],
    ['Communication Style', data.communicationStyle],
    ['Conflict Resolution', data.conflictResolution],
    ['Negotiation Method', data.negotiationMethod],
    ['Decision-Making', data.decisionMaking],
    ['Emotional Intelligence', data.emotionalIntelligence],
    ['Feedback Mechanism', data.feedbackMechanism],
    ['Core Values', data.coreValues]
  ];

  const summaryHTML = items
    .filter(([, value]) => value)
    .map(([label, value]) => createSummaryItem(label, value))
    .join('');

  document.getElementById('personalitySummary').innerHTML = summaryHTML;
}

/**
 * Generates a detailed personality description and updates the DOM
 * @param {Object} data - The personality profile data
 * @param {string} [data.characterName] - Character name
 * @param {string} [data.characterGender] - Character gender
 * @param {string} [data.characterAge] - Character age range
 * @param {string} [data.characterRole] - Character's organisational role
 * @param {string} [data.orgType] - Type of organisation
 * @param {string} [data.orgName] - Name of organisation
 * @param {string} [data.audience] - Primary audience
 * @param {string} [data.obTheories] - Organisational behaviour theories
 * @param {string} [data.communicationStyle] - Communication style
 * @param {string} [data.conflictResolution] - Conflict resolution approach
 * @param {string} [data.negotiationMethod] - Negotiation method
 * @param {string} [data.decisionMaking] - Decision-making approach
 * @param {string} [data.emotionalIntelligence] - Emotional intelligence level
 * @param {string} [data.feedbackMechanism] - Feedback mechanism
 * @param {string} [data.coreValues] - Core values
 * @returns {void}
 */
export function generateDescription(data) {
  let description = `<p><strong>${data.characterName || 'The chatbot character'}</strong> is a ${data.characterAge || 'mature'} ${data.characterGender || 'professional'} working as a ${data.characterRole || 'team member'} at <strong>${data.orgName || 'the organisation'}</strong>.`;

  description += ` As a ${data.communicationStyle?.toLowerCase() || 'professional'} communicator`;

  if (data.orgType) description += ` within a ${data.orgType.toLowerCase()} context,`;
  if (data.audience) description += ` primarily serving ${data.audience.toLowerCase()},`;
  description += ` ${data.characterName || 'this character'} brings a unique perspective to workplace interactions.</p>`;

  if (data.obTheories) {
    description += `<p>Drawing from ${data.obTheories}, this character approaches interactions with a strong theoretical foundation. `;
  }

  if (data.conflictResolution) {
    description += `When conflicts arise, they employ ${data.conflictResolution.toLowerCase()} techniques. `;
  }

  if (data.negotiationMethod) {
    description += `Their negotiation style is ${data.negotiationMethod.toLowerCase()}, `;
  }

  if (data.decisionMaking) {
    description += `and decisions are made in a ${data.decisionMaking.toLowerCase()} manner.`;
  }

  description += `</p><p>`;

  if (data.emotionalIntelligence) {
    description += `They demonstrate ${data.emotionalIntelligence.toLowerCase()}, `;
  }

  if (data.feedbackMechanism) {
    description += `and provide feedback using ${data.feedbackMechanism.toLowerCase()}. `;
  }

  if (data.coreValues) {
    description += `Their core values include ${data.coreValues.toLowerCase()}, which guide their actions.`;
  }

  description += `</p>`;

  document.getElementById('personalityDescription').innerHTML = description;
}