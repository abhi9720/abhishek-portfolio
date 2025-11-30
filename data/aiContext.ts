
import {
  PERSONAL_INFO,
  RESUME_LINK,
  SOCIAL_LINKS,
  KEY_HIGHLIGHTS,
  EXPERIENCES,
  PROJECTS,
  SKILLS,
  CURRENT_INTERESTS,
  EDUCATION,
  CERTIFICATIONS
} from '../constants';

export const GENERATED_AI_CONTEXT = `
<portfolio_context>
  <personal_info>
    <name>${PERSONAL_INFO.name}</name>
    <title>${PERSONAL_INFO.title}</title>
    <location>${PERSONAL_INFO.location}</location>
    <email>${PERSONAL_INFO.email}</email>
    <phone>${PERSONAL_INFO.phone}</phone>
    <summary>${PERSONAL_INFO.summary}</summary>
    <resume_link>${RESUME_LINK}</resume_link>
  </personal_info>

  <social_links>
    ${SOCIAL_LINKS.map(link => `<link name="${link.name}" url="${link.url}" />`).join('\n    ')}
  </social_links>

  <key_highlights>
    ${KEY_HIGHLIGHTS.map(h => `<highlight metric="${h.metric}">${h.description}</highlight>`).join('\n    ')}
  </key_highlights>

  <experience_history>
    ${EXPERIENCES.map(exp => `
    <job>
      <role>${exp.role}</role>
      <company>${exp.company}</company>
      <period>${exp.period}</period>
      <location>${exp.location}</location>
      <summary>${exp.summary}</summary>
      <details>
        ${exp.description.map(d => `<point>${d}</point>`).join('\n        ')}
      </details>
    </job>`).join('\n')}
  </experience_history>

  <projects>
    ${PROJECTS.map(p => `
    <project>
      <title>${p.title}</title>
      <category>${p.category}</category>
      <technologies>${p.tech.join(', ')}</technologies>
      <tags>${p.tags.join(', ')}</tags>
      <description>${p.description}</description>
      <link>${p.link}</link>
      ${p.liveDemoUrl ? `<live_demo>${p.liveDemoUrl}</live_demo>` : ''}
    </project>`).join('\n')}
  </projects>

  <skills>
    ${SKILLS.map(cat => `
    <category name="${cat.name}">
      ${cat.skills.map(s => `<skill>${s}</skill>`).join('\n      ')}
    </category>`).join('\n')}
  </skills>

  <education>
    <degree>${EDUCATION.degree}</degree>
    <institution>${EDUCATION.institution}</institution>
    <period>${EDUCATION.period}</period>
    <cgpa>${EDUCATION.cgpa}</cgpa>
    <coursework>${EDUCATION.coursework.join(', ')}</coursework>
  </education>

  <certifications>
    ${CERTIFICATIONS.map(c => `
    <certification>
      <name>${c.name}</name>
      <issuer>${c.issuer}</issuer>
      <date>${c.date}</date>
      <id>${c.credentialId || 'N/A'}</id>
    </certification>`).join('\n')}
  </certifications>

  <interests>
    ${CURRENT_INTERESTS.map(i => `<interest>${i}</interest>`).join('\n    ')}
  </interests>
</portfolio_context>
`;
