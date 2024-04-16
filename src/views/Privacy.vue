<template>
    <section class="privacy">
        <div class="container">
            <h1 class="privacy__title">Privacy Notice</h1>

            <div class="privacy__block">
                <h2>About this Privacy Notice</h2>
                <p>This Privacy Notice is meant to give you information about what personal data we collect about you, how we use it, why we use it, and how you control the data processing.</p>
            </div>

            <div class="privacy__block privacy__nav">
                <h2>Table of contents</h2>
                <ul class="privacy__subblock">
                    <li @click="scrollTo('privacy-1')">1. The Basics: Who We Are, Our Role, and Definitions</li>
                    <li>
                        <div @click="scrollTo('privacy-2')">2. Personal Data We Collect, How We Use it, and Why</div>
                        <ul class="privacy__subnav">
                            <li @click="scrollTo('privacy-2-1')">2.1 Website Visitors</li>
                            <li @click="scrollTo('privacy-2-2')">2.2 Users</li>
                            <li @click="scrollTo('privacy-2-3')">2.3 Job Applicants</li>
                            <li @click="scrollTo('privacy-2-4')">2.4 Event Participants</li>
                            <li @click="scrollTo('privacy-2-5')">2.5 Visitors to Our Social Media Pages</li>
                        </ul>
                    </li>
                    <li @click="scrollTo('privacy-3')">3. Our Marketing Activities</li>
                    <li @click="scrollTo('privacy-4')">4. Sharing the Personal Data We Collect</li>
                    <li @click="scrollTo('privacy-5')">5. International Transfers</li>
                    <li @click="scrollTo('privacy-6')">6. Security</li>
                    <li @click="scrollTo('privacy-7')">7. Your Rights - How to Control Our Use of Your Personal Data</li>
                    <li @click="scrollTo('privacy-8')">8. Data Retention</li>
                    <li @click="scrollTo('privacy-9')">9. Cookies and Similar Technologies</li>
                    <li @click="scrollTo('privacy-10')">10. Third-Party Services</li>
                    <li @click="scrollTo('privacy-11')">11. Children</li>
                    <li @click="scrollTo('privacy-12')">12.  Changes to the Privacy Notice</li>
                </ul>
            </div>

            <div class="privacy__block" id="privacy-1">
                <h2>1. The Basics</h2>
                <div class="privacy__subblock">
                    <h3>1.1. Who We Are</h3>
                    <p>1.1.1.  ROVR LIVE LTD offers a platform for music streaming through our website and mobile app. Our offices are located at London, E1 6AN · United Kingdom and our registration number is 516378304.</p>
                    <p>1.1.2.  If you have questions about our company or your privacy, or want to exercise your rights, you can contact us at <a href="mailto:info@rovr.live">Info@rovr.live</a>.</p>
                    <p>1.1.3.  We have appointed a data protection officer (DPO), who oversees our privacy practices. If you have any comments or questions about this Privacy Notice or if you wish to exercise any of your rights, please contact our DPO at Ben@rovr.live.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>1.2. Our Role</h3>
                    <p>Certain data protection laws, including the laws in the EU, differentiate between a party that determines why and how personal data is processed (called a "controller") and a party that processes personal data solely on the controller's behalf and according to the controller's instructions (called a "processor"). We are the controller in respect of the processing described in this Privacy Notice.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>1.1. Definitions and Recommendations</h3>
                    <p>1.1.1.  When we refer to <strong>"services"</strong>, we mean music streaming services through our website and mobile app.</p>
                    <p>1.1.2.  When we refer to <strong>"personal data"</strong>, we mean information that is defined as personal data under law. This includes information that identifies you directly or indirectly, including unique identifiers like IP addresses or cookie IDs.</p>
                    <p>1.1.3.  When we refer to <strong>"you"</strong>, we mean visitors to our website, job applicants, event participants and any user of our site and/or app as applicable.</p>
                    <p>1.1.4.  This Privacy Notice is meant to be read together with our Terms of Service, which you can find at <router-link to="/terms">Terms & Conditions</router-link>. In general, we recommend that you routinely review this privacy notice and your preferences on our site and/or app.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>1.2. A Note on Legal Bases</h3>
                    <p>Certain jurisdictions only allow the processing of personal data where a legal basis has been established. Under the EU's General Data Protection Regulation ("GDPR"), the possible legal bases include (but are not limited): your consent, the processing is necessary to perform a contract with you, the processing is necessary to fulfill our legal obligations, or a company has a legitimate business interest to process your personal data. Where we are a controller, we only collect and process data where we have established a legal basis. Below you can find more details about specific legal bases.</p>
                </div>
            </div>

            <div class="privacy__block" id="privacy-2">
                <h2>2. Personal Data We Collect, How We Use It, and Why</h2>
                <p>Below is a description of the types of personal data we collect, how we use it, and the reason why we consider each use lawful. You have no legal obligation to provide us with personal data, but if you don't provide us with certain information, we may not be able to provide you with the associated services.</p>
                <div class="privacy__subblock" id="privacy-2-1">
                    <h3>2.1. Website Visitors</h3>
                    <p>When you visit our site, we may collect the following types of data about you.</p>
                    <p>2.1.1. <strong>Contact Form Information</strong> When you sign up for our newsletters or mailing list we collect your name and email address.</p>
                    <p>How We Use this Data: To respond to your message and to provide you with informational newsletters about our products and services.</p>
                    <p>Legal Basis: We process this personal data based on the performance of a contract with you. Processing your Personal Data to share our newsletters and/or promotional materials is based on your consent. You may withdraw your consent at any time by emailing us at <a href="mailto:info@rovr.live">Info@rovr.live</a>.</p>
                    <p>2.1.2. <strong>Activity and System Data (Cookies)</strong> – When you visit our site, we automatically collect data about your computer or mobile device, including personal data such as your IP address, device ID, browsing history (e.g. the other sites you've visited before ours), and your activity on our site (e.g. what pages you visited, for how long, and what links you clicked on). For more information about the cookies we use and how to adjust your preferences, see the Cookies and Similar Technologies section below.</p>
                    <p>How We Use this Data: We mainly use this data to generate aggregated analytics data about the use of our site so we can maintain and improve the site and develop new products or services. We also use statistical data to prevent fraud and protect the security of our site. One of the tools we use to collect and analyze this data is "Google Analytics". For more information about how Google collects information and how you can control such use, see: <a href="https://www.google.com/policies/privacy/partners/" target="_blank">www.google.com/policies/privacy/partners/</a>.</p>
                    <p>Legal Basis: We process this personal data based our legitimate interests to develop and improve our products and services, and to prevent fraud. When we collect your activity data to advertise to you, we do so on the basis of our legitimate interest to market our own products and services. We will only use your personal data for marketing third parties' products and Services if you have given your consent. You may withdraw your consent at any time by contacting us at <a href="mailto:info@rovr.live">Info@rovr.live</a>. We will process your request as soon as reasonably possible, however it may take a few days for us to update our records before any opt out is effective. Additional information regarding Our Marketing Activities is provided below.</p>
                </div>
                <div class="privacy__subblock" id="privacy-2-2">
                    <h3>2.2. Users</h3>
                    <p>If you are a user of our site and/or app, we collect the following information from and about you.</p>
                    <p>2.2.1. <strong>Registration Data</strong> – In order to access our site and/or app, you must first create an account. When creating an account, you will be asked to provide some of the following information: your email address, password, birth date and musical preferences. You may add  country and mobile phone number if you wish.</p>
                    <p>How We Use this Data: We use your registration information to allow you to access to our site and/or app, save your preferences, protect the security of our site and/or app, prevent fraud, and address any issues that arise. We use your contact details to communicate with you about our site and/or app. We also use your contact details to send you informational newsletters about our products and services.</p>
                    <p>Legal Basis: When we process your registration data to provide you with our services, we do so to perform a contract with you, in this case our <router-link to="/terms">Terms</router-link> of Service. When we process your registration data to maintain our site and/or app, including to prevent fraud, protect the security of and/or address issues with our site and/or app, we do so on the basis of our legitimate interest to maintain our assets. When we use your Personal Data to send you promotional materials relating to our services, we do so based on your consent. You may withdraw your consent at any time by emailing us at <a href="mailto:info@rovr.live">Info@rovr.live</a>.</p>
                    <p>2.2.2. <strong>Activity and System Data (Cookies)</strong> – We collect data about your device and your activity, as described more fully above in section 2.1.2, when you use our site and/or app.</p>
                    <p>2.2.3. <strong>Geo-Location</strong> – If you consent, we collect your (geo)location when you use our site and/or app.</p>
                    <p>How We Use this Data: We use your location for statistical and analytical purposes.</p>
                    <p>Legal Basis: We process your location based on your consent. You may withdraw your consent at any point by changing your device settings.</p>
                    <p>2.2.4. <strong>Android's App Set ID</strong> – We collect Android's App Set ID from your device when you use our app.</p>
                    <p>How We Use this Data: We use the App Set ID for the essential purposes of analytics and fraud prevention. We do not connect the App Set ID to any Android advertising identifiers (for example, AAIDs) or any personal data for advertising purposes. We process the App Set ID in accordance with Google Play's <a href="https://support.google.com/googleplay/android-developer/answer/10144311?hl=en&utm_source=activetrail&utm_medium=email&utm_campaign=GOOGLE%20PLAY%20UPDATES" target="_blank">User Data Policy</a>.</p>
                    <p>Legal Basis: When we process your App Set ID to prevent fraud, we do so based on our legitimate interest to protect ourselves and our customers. When we process it for analytics purposes, we do so based on our legitimate interests to improve our services.</p>
                </div>
                <div class="privacy__subblock" id="privacy-2-3">
                    <h3>2.3. Job Applicants</h3>
                    <p>If you apply for a job with us, we collect the information you provide as part of your application and during the course of the application process. This may include your name, contact details, resume, recommendations, and any other information we may request or that you choose to share with us.</p>
                    <p>How We Use this Data: We use this data to process your job application, including using your contact details to contact you for scheduling purposes and to provide you with updates. We also use this data to manage our recruitment campaigns, as well as to analyze their results and improve future campaigns.</p>
                    <p>Legal Basis: We process your application data based on our legitimate interest to attract and assess candidates for employment.</p>
                </div>
                <div class="privacy__subblock" id="privacy-2-4">
                    <h3>2.4. Event Participants</h3>
                    <p>From time to time, we hold special events in which we may invite you to participate. If you receive an invitation, we may collect the following Personal Data from you:</p>
                    <p>2.4.1. <strong>Registration Data</strong> – When you register for and participate in an event, we collect your name, contact details, and any other information we may request.</p>
                    <p>How we use this data: We use this data for logistical purposes, such as to help us plan the event, as well as to contact you with reminders and updates about the event and to ask for your feedback regarding the event so that we may improve future events or our services. If you consent, we may also send you marketing information about future events and other updates.</p>
                    <p>Legal Basis: When we process this personal data in the course of planning for and running the event, we do so in order to perform a contract with you. When we process this personal data to improve our events and services, we do so based on our legitimate interest to grow and improve our business and services. When we process this personal data to send you marketing information, we do so based on your consent. You may withdraw your consent at any time by contacting us at <a href="mailto:info@rovr.live">Info@rovr.live</a></p>
                    <p>2.4.2. <strong>Event Pictures</strong> – We may hire photographers to cover certain events. Event participants may be photographed directly or may appear in the background of event photos.</p>
                    <p>How we use this data: We may post event pictures, including on social media, to notify or update the public that the event took place. We may tag individuals in specific photos. We may also use the photos in other marketing materials.</p>
                    <p>Legal Basis: When we collect event pictures, we do so on the basis of our legitimate interest to market future events and our services.</p>
                </div>
                <div class="privacy__subblock" id="privacy-2-5">
                    <h3>2.5. Visitors to Our Social Media Pages</h3>
                    <p>When you engage with our social media outlets, such as when you re-tweet our posts, answer surveys, or similar activities, we collect the personal data you provide, such as the content of your post and the information available to us through your profile or account. The social media companies we use may also provide us with aggregate and analytical information about activity relating to us.</p>
                    <p>How we use this data: We may use this information to engage with you or respond to your posts and comments and to analyze the effectiveness of our social media efforts and to improve how we manage them, and for marketing purposes.</p>
                    <p>Legal Basis: When we process your personal data to engage with you or respond to your posts and comments and to, we do so on the basis of our legitimate interest to engage with and serve our audiences in an effective manner. When we process your personal data to improve our social media outlets or for marketing purposes, we do so based on our legitimate interest to effectively market our products and services, improve our services, and develop new ones.</p>
                </div>
            </div>

            <div class="privacy__block" id="privacy-3">
                <h2>3. Our Marketing Activities</h2>
                <p>As described above, we may use personal data we collect for advertising and marketing purposes. We try to limit the marketing material we send to a reasonable and proportionate level. Below we describe how you can control the marketing material you receive from us.</p>
                <div class="privacy__subblock">
                    <h3>3.1. Email Marketing and Services Communications</h3>
                    <p>3.1.1.  We use your contact details to send you informational newsletters and other marketing material about our products and services if you have provided your consent. You may withdraw your consent at any time by emailing us at <a href="mailto:info@rovr.live">Info@rovr.live</a>. If you consent, we may also send you marketing material of our products and services as well as that of third parties. You can withdraw your consent at any time by contacting us at <a href="mailto:info@rovr.live">Info@rovr.live</a>.</p>
                    <p>3.1.2.  You can stop the delivery of all marketing emails by following the "unsubscribe" link in any messages we send you. Alternatively, you can contact us at <a href="mailto:info@rovr.live">Info@rovr.live</a> to request to unsubscribe.</p>
                    <p>3.1.3.  Note that if you are a registered user, we may need to contact you about administrative or service-related issues as part of the services we provide to you. This is not marketing communication and you will continue to receive these messages even if you opt-out of marketing emails.</p>
                </div>
            </div>

            <div class="privacy__block" id="privacy-4">
                <h2>4. Sharing the Personal Data We Collect</h2>
                <p>We share your personal data as follows:</p>
                <div class="privacy__subblock">
                    <h3>4.1. Service Providers</h3>
                    <p>Below is a list of the types of service providers we use, the service each provides, and the types of data shared with each. All service providers have agreed to confidentiality restrictions and have undertaken to use your personal data solely as we direct.</p>
                    <table>
                        <thead>
                            <th>Type of Service</th>
                            <th>Description</th>
                            <th>Personal Data Shared</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cloud Computing</td>
                                <td>We use service providers that offer cloud computing services. They offer us space on their servers for us to store our files and programs, including your personal data.</td>
                                <td>All personal data that we collect from you is stored on third party servers.</td>
                            </tr>
                            <tr>
                                <td>Customer Relationship Management (CRM)</td>
                                <td>We use an external CRM tool to help us keep track of our customers and information related to them, including their personal data.</td>
                                <td>Your name, company, position, email address, and phone number.</td>
                            </tr>
                            <tr>
                                <td>Email Marketing</td>
                                <td>We use an independent vendor to send out marketing emails on our behalf.</td>
                                <td>Your name and email address.</td>
                            </tr>
                            <tr>
                                <td>Analytics Providers</td>
                                <td>We use a service provider to assist us with analytics services.</td>
                                <td>Data collected automatically through our site, including IP addresses and cookie information.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="privacy__subblock">
                    <h3>4.2. Change of Ownership</h3>
                    <p>If we are looking to sell our company, liquidate assets, or merge with another, we may share your personal data with other interested parties as part of negotiations toward that transaction and in connection with the actual transaction. In such case, or where we do sell our company, your personal data shall continue to be subject to the provisions of this Privacy Notice.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>4.3. Law Enforcement Related Disclosure.</h3>
                    <p>We may share your personal data with government agencies or other relevant parties, such as a law office or independent auditor: (i) if we believe that such disclosure is appropriate to protect our rights, property or safety (including the enforcement of the <router-link to="/terms">Terms</router-link> and this Privacy Notice) or those of a third party; (ii) if required by law or court order; or (iii) as is necessary to comply with any legal and/or regulatory obligations, such as audit requirements.</p>
                </div>
            </div>

            <div class="privacy__block" id="privacy-5">
                <h2>5. International Transfers</h2>
                <p>Some of our service providers are located in countries other than your own. When we transfer your personal data internationally, we will do so safely and securely and in accordance with applicable law.</p>
                <div class="privacy__subblock">
                    <p>5.1. If you are located in the EU, when we share your personal data with third parties based outside of the European Economic Area ("EEA"), we will ensure that they sign on agreements that require them to comply with applicable law, keep your data secure at similar levels to the level described in this Privacy Notice, and make sure that your data protection rights are protected. We will also implement the following safeguards:</p>
                    <p>5.1.1. When we transfer your personal data to Israel or the UK, we rely on the decision by the European Commission that says that those countries are considered to provide an adequate level of data protection.</p>
                    <p>5.1.2. Where we transfer your personal data to other countries, we (i) take additional security measures to protect the data and (ii) use specific contracts approved by the European Commission, known as the Standard Contractual Clauses, to give your personal data the same protection it has in the EEA.</p>
                    <p>5.1.3. Please contact us at <a href="mailto:info@rovr.live">Info@rovr.live</a> if you would like further information on the specific mechanism used by us when transferring your Personal Data out of the EEA.</p>
                </div>
            </div>

            <div class="privacy__block" id="privacy-6">
                <h2>6. Security</h2>
                <p>The security of your personal data is our highest priority. We work hard to make sure that your personal data will be held securely and that it will not be shared or lost accidentally. However, it is impossible to guarantee absolute security. The security of your data also depends on the security of the devices you use and the way in which you protect your user IDs and passwords. The measures we take include:</p>
                <div class="privacy__subblock">
                    <h3>6.1. Technical Measures</h3>
                    <p>The electronic safeguards we employ to protect your personal data include secure servers, firewalls, and antivirus protections. We encrypt data in transit using secure and encrypted SSL protocols.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>6.2. Access Control</h3>
                    <p>We limit access to your personal data only to authorized personnel who have a need to know, currently including account managers, customer support staff, and software developers. We review these permissions regularly and revoke an employee's access immediately after his/her termination. Additionally, we may make changes to the types of personnel with access rights.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>6.3. Internal Policies</h3>
                    <p>We maintain and regularly review and update our privacy related and information security policies.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>6.4. Personnel</h3>
                    <p>We require employees to sign non-disclosure agreements according to applicable law and industry customary practice.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>6.5. Standards and Certifications</h3>
                    <p>We have been certified as compliant with ISO 27001 (Information Security Management)/ ISO 27017 (Cloud Security)/ ISO 27018 (Cloud Privacy).</p>
                </div>
                <div class="privacy__subblock">
                    <h3>6.6. Database Backup</h3>
                    <p>Our databases are backed up and verified regularly. Backups are encrypted and stored within the production environment to preserve their confidentiality and integrity.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>6.7. We use Anti-virus protection of servers and Anti Ddos service</h3>
                </div>
            </div>
            <div class="privacy__block" id="privacy-7">
                <h2>7. Your Rights - How to Control Our Use of Your Personal Data</h2>
                <p>Depending on which laws apply, you have certain legal rights over your data. Below is some general information about rights that may apply to you but we recommend checking the law or consulting with a lawyer to understand what applies in your specific case. To exercise your rights, please contact us at <a href="mailto:info@rovr.live">Info@rovr.live</a>. We may ask for reasonable evidence to verify your identity before we can comply with any request.</p>
                <div class="privacy__subblock">
                    <h3>7.1. Right of Access</h3>
                    <p>You may have a right to know what personal data we collect about you. We may charge you with a fee to provide you with this information, if permitted by law. If we are unable to provide you with all the information you request, we will do our best to explain why. See <a href="https://gdpr-info.eu/art-15-gdpr/" target="_blank">Article 15</a> of the GDPR for more details, if your personal data is subject to GDPR.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>7.2. Right to Correct Personal Data</h3>
                    <p>You may request that we update, complete, correct or delete inaccurate, incomplete, or outdated Personal Data. See <a href="https://gdpr-info.eu/art-16-gdpr/" target="_blank">Article 16</a> of the GDPR for more details, if your personal data is subject to GDPR.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>7.3. Deletion of Personal Data ("Right to Be Forgotten")</h3>
                    <p>If you are located in the EU, you may have the right to request that we delete your personal data. Note that we cannot restore information once it has been deleted. Even after you ask us to delete your personal data, we may be allowed to keep certain data for specific purposes under applicable law. See <a href="https://gdpr-info.eu/art-17-gdpr/" target="_blank">Article 17</a> of the GDPR for more details, if your personal data is subject to GDPR.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>7.4. Right to Restrict Processing</h3>
                    <p>If you are located in the EU, you may have the right to ask us to stop processing your personal data. See <a href="https://gdpr-info.eu/art-18-gdpr/" target="_blank">Article 18</a> of the GDPR for more details, if your personal data is subject to GDPR.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>7.5. Right to Data Portability</h3>
                    <p>If you are located in the EU, you may have the right to request that we provide you with a copy of the personal data you provided to us in a structured, commonly-used, and machine-readable format. See <a href="https://gdpr-info.eu/art-20-gdpr/" target="_blank">Article 20</a> of the GDPR for more details, if your personal data is subject to GDPR.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>7.6. Right to Object</h3>
                    <p>If you are located in the EU, you may have the right object to certain processing activities. See <a href="https://gdpr-info.eu/art-21-gdpr/" target="_blank">Article 21</a> of the GDPR for more details, if your personal data is subject to GDPR.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>7.7.  Withdrawal of Consent</h3>
                    <p>If we are processing your data based on your consent, you are always free to withdraw your consent, however, this won't affect processing we have done from before you withdrew your consent.</p>
                </div>
                <div class="privacy__subblock">
                    <h3>7.8. Right to Lodge a Complaint with Your Local Data Protection Authority</h3>
                    <p>If you are located in the EU, you have the right to submit a complaint to the relevant data protection authority if you have any concerns about how we are processing your personal data, though we ask that as a courtesy you please attempt to resolve any issues with us first.</p>
                </div>
            </div>
            <div class="privacy__block" id="privacy-8">
                <h2>8. Data Retention</h2>
                <p>8.1. We retain your personal data as long as necessary to fulfill each of the purposes we described above. Once we're done with your data, generally within 48 hours, we delete it.</p>
                <p>8.2. When deciding how long to store personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized access, the purposes for which the personal data was collected, as well as applicable legal requirements. Please note that we may delete information from our systems without notifying you first. Retention by any of our service providers or subcontractors may vary in accordance with each business's retention policy.</p>
                <p>8.3. Please contact us at <a href="mailto:info@rovr.live">Info@rovr.live</a> if you would like details about the retention periods for each type of personal data we process</p>
            </div>
            <div class="privacy__block" id="privacy-9">
                <h2>9. Cookies and Similar Technologies.</h2>
                <div class="privacy__subblock">
                    <h3>9.1. What are Cookies?</h3>
                    <p>A cookie is a small piece of text that is sent to your browser by a website you visit. This piece of text acts as a sort of tag, letting the website know that it's you (really, your device) that's visiting. There are other technologies that act similarly, like web beacons, pixel tags, and Device IDs for apps, but for simplicity's sake we'll refer to them all as "cookies".</p>
                </div>
                <p>9.2. Websites can place their own cookies (called "first-party cookies") but can also place cookies from other sites (called "third-party cookies"). If your browser holds both first and third-party cookies for a given website, both the website and the third party are notified when you visit the site. We may place both first and third-party cookies on our site and/or app.</p>
                <div class="privacy__subblock">
                    <h3>9.3. How We Use Cookies</h3>
                    <p>While the specific names and types of cookies we use may change from time to time, they generally fall into one of the categories listed below.</p>
                </div>
                <div class="privacy__subblock">
                    <table>
                        <thead>
                            <th>Cookie Type</th>
                            <th>Function</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Necessary</td>
                                <td>These cookies allow the site and/or app to work correctly. They enable your access to the site and/or app, move around, and access different services, features, and tools. These cookies identify you as being logged in to the website and to authenticate you; make sure you connect to the right service on the website when we make any changes to the way it works; for security purposes. If you prevent these cookies, we can’t guarantee how the website or the security on the website will perform during your visit.</td>
                            </tr>
                            <tr>
                                <td>Functionality</td>
                                <td>These cookies remember your settings, preferences, and other choices you make (like placing an item in a shopping cart) in order to help personalize and streamline your experience.
                                    We use ‘Functionality’ cookies for such purposes as:
                                    <ul>
                                        <li>Remember settings you’ve applied such as layout, text size, preferences and colors</li>
                                        <li>Remember if we’ve already asked you if you want to fill in a survey</li>
                                        <li>Remember if you have engaged with a specific component or list on the website so that it won’t repeat</li>
                                        <li>Show you when you’re logged in to the website and/or app</li>
                                        <li>To provide and show embedded video content</li>
                                        <li>Number listening for the streams, archiving programs, and sharing content and information about our programs</li>
                                        <li>Some of these cookies are managed for us by third parties.</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>Security</td>
                                <td>These cookies help us identify and prevent security risks. They may be used to store your session information to prevent others from changing your password without your login information.</td>
                            </tr>
                            <tr>
                                <td>Performance/Analytics</td>
                                <td>These cookies collect analytical information to help us understand how you use our site and/or app, for example whether you have viewed messages, clicked on links, and how long you spent on each page. This helps us improve our site and/or app to better suit your needs.
                                    <ul>
                                        <li>These cookies also carry out web analytics and provide statistics on how the website and/or app are used</li>
                                        <li>Perform affiliate tracking: Provide feedback to affiliated entities that one of our visitors also visited their site</li>
                                        <li>Obtain data on the number of users of the website and/or app that have viewed a product or service</li>
                                        <li>Help us improve the website and/or app by measuring any errors that occur</li>
                                        <li>Test different designs for the website and/or app</li>
                                        <li>Some of our performance cookies are managed for us by third parties</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="privacy__subblock">
                    <h3>9.4. How to Adjust Your Preferences</h3>
                    <p>Most web browsers are initially configured to accept cookies, but you can change the settings so your browser refuses all cookies or certain types of cookies. In addition, you are free to delete any existing cookies at any time. Please note that some features of the services may not function properly when cookies are disabled or removed. For example, if you delete cookies that store your account information or preferences, you will be required to input these each time you visit.</p>
                </div>
            </div>
            <div class="privacy__block" id="privacy-10">
                <h2>10. Third-Party Services</h2>
                <p>You may have access to third-party services, such as streaming services through our services. Please note that all use of third-party services is at your own risk and subject to such third party's terms and privacy policies. We do not take any responsibility for the performance of other services.</p>
            </div>
            <div class="privacy__block" id="privacy-11">
                <h2>11. Children</h2>
                <p>We do not knowingly collect personal data from children under the age of thirteen (13). In the event that you become aware that an individual under the age of thirteen (13) has registered without parental permission, please advise us immediately.</p>
            </div>
            <div class="privacy__block" id="privacy-12">
                <h2>12. Changes to the Privacy Notice</h2>
                <p>We may update this Privacy Notice from time to time to keep it up to date with legal requirements and the way we operate our business. We will place any updates on this webpage. Please come back to this page every now and then to make sure you are familiar with the latest version.</p>
            </div>
            
            <div class="privacy__block privacy__kids">
                <h2>Privacy Summary for Kids</h2>
                <p>We think your privacy is important. That's why we wrote this summary so that you will know what we do with the information we have about you without having to read the boring adult Privacy Notice above. We also want you to know how your information is protected and we want you to know how you can make decisions about how we treat your information.</p>
                <p>It's probably best if you read this together with a responsible grown-up, like a parent. If you have any questions, you should speak with a grown-up, or you can always talk to us.</p>
                <p>If you use our website or app, we're responsible for information about you that gets collected through the website and app. This means that we have a special role, called a 'Controller', in the law.</p>
                <h3>Who can use our Website and App?</h3>
                <p>When you use our website or open our app, we will ask you for some information that will allow us to understand how old you are. Please answer truthfully so that we can make sure that we use your information in an appropriate way. The way we handle your information will depend on your age and the laws that apply in the country where you live.</p>
                <h3>What kind of information do we have about you and how do we use it?</h3>
                <p>There is some information that you provide to us and some information that we collect automatically.</p>
                <p>For example, when you answer our question about what year you were born, we can figure out how old you are. We collect some information when you sign up for our service, such as what kind of music you like.</p>
                <p>We also collect some identifying numbers that help us recognize your device so that we'll be able to know who you are when you enter the website or app again. If we're able to recognize you, we can make the music more fun for you. This information also helps us understand what music you like so that we can make our service better and more fun for all of the listeners.</p>
                <p>You have no legal obligation to provide us with any information about you and can always decide that you don't want us to have any information about you. If you decide that, then we may not be able to let you use all or part of our services since they won't work without this information.</p>
                <h3>How do we share your information with others?</h3>
                <p>We work with a bunch of other businesses and people who help us build and fix our music streaming service. Some might help us make sure the music is working and others might help us understand how it works. We have to share your information with them so that they can help us provide you with our website and app. These other businesses might not be in the country where you live. When we send them the information in the country where they are, we make sure that they are just as careful to protect your information as we are.</p>
                <p>If we sell our business, we'll have to share your information with the new owner. If that happens, we'll make sure that the new owner treats your information in the same way that we do.</p>
                <p>If a law says that we have to use your information in a certain way, we'll do what the law says to do. If the law says that we have to share information with someone else, we'll also do that.</p>
                <h3>How can you decide what we do with your information?</h3>
                <p>You can ask us to do any of the things on this list, but you will have to get permission from your parent or guardian first:</p>
                <ul>
                    <li>You can find out what information we have and ask us to send you a copy.</li>
                    <li>If you find that we have some wrong information, you can ask us to correct it.</li>
                    <li>You can ask us to erase any information we have. If we do, then we won't be able to bring it back.</li>
                    <li>You can sometimes ask us to stop using your information.</li>
                    <li>If you live in the European Union, you can tell a supervisory authority if you think we did something wrong. You will definitely need to ask a parent or guardian before you do this.</li>
                </ul>
                <h3>Cookies!</h3>
                <p>No, not that kind of cookies! Cookies are a kind of technology that helps our website and app work. It helps remember things that you do on our website and in our app and gives us information that can help us make it work better. We need some of the cookies to help the website and app work properly and keep it safe.</p>
                <h3>How long do we keep information?</h3>
                <p>We only keep information as long as we need it in order to do the things we said we were going to do with it. If we don't need it, we'll erase it.</p>
                <h3>How is it protected?</h3>
                <p>We looked around to see what security measures are currently available to protect your information and what other companies like us do to protect their information and made sure that we're doing at least as good a job as they are. That doesn't mean everything is 100% safe but we do our best!</p>
                <h3>What if we change our mind about how we use your information?</h3>
                <p>If we do, we'll make sure to let you and your parent or guardian know (by posting an updated Privacy Notice on the website).</p>
                <h3>How can you reach us? </h3>
                <p>If you have any questions or want to tell us something about how we use and collect your information, or if you want us to delete or fix your information, you can email us at <a href="mailto:info@rovr.live">Info@rovr.live</a> Please remember to speak with your parent or guardian before you do.</p>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute()
    const webviewParam = route.query.webview;

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (webviewParam) {
        document.body.classList.add('webview');
    } else {
        document.body.classList.remove('webview');
    }
</script>

<style lang="scss" scoped>
    .privacy {
        height: auto;
        padding: 3rem 0 2rem 0;
        color: $primary;

        .container {
            max-width: 1400px;
            padding: 0 1rem;
        }

        &__title {
            @include font-size(48px);
            margin: 0 0 4rem 0;
            padding-bottom: 3rem;
            border-bottom: 1px solid $primary;
            line-height: 1;
            text-transform: uppercase;
            @media screen and (max-width: 1024px) {
                @include font-size(36px);
                margin-bottom: 2.5rem;
                padding-bottom: 2rem;
            }
        }

        &__block {
            h2 {
                line-height: 1.5;
                @media screen and (max-width: 1024px) {
                    @include font-size(24px);
                }
            }

            h3 {
                @media screen and (max-width: 1024px) {
                    @include font-size(20px);
                }
            }

            p {
                line-height: 1.5;

                strong {
                    font-weight: bold;
                }

                a {
                    color: inherit;
                }

                @media screen and (max-width: 1024px) {
                    @include font-size(16px);
                }
            }
        }

        &__nav {
            display: inline-block;
            padding: 2rem 1rem;
            border: 1px solid $primary;
            h2 {
                margin: 0 0 1rem 0;
            }
            ul {
                padding-left: 2rem;
                li {
                    display: block;
                    margin-bottom: 1rem;
                    cursor: pointer;
                    line-height: 1.5;
                }
                @media screen and (max-width: 1024px) {
                    &:not(.privacy__subnav) {
                        padding-left: 0;
                    }
                    li {
                        @include font-size(16px);
                    }
                }
            }
        }
        &__subnav {
            padding-left: 1rem;
            margin-top: 1rem;
            a:not(:last-child) {
                margin-bottom: 0.5rem;
            }
        }

        table, th, td {
            border: 1px solid $primary;
            border-collapse: collapse;
        }
        th, td {
            padding: 2rem;
            ul {
                list-style: disc;
                padding-left: 2rem;
                margin-top: 1rem;
                li:not(:last-child) {
                    margin-bottom: 0.5rem;
                }
            }
            @media screen and (max-width: 1024px) {
                @include font-size(14px);
                line-height: 1.5;
                padding: 1rem ;
                ul {
                    padding-left: 1rem;
                }
            }
        }
        &__kids {
            h2 {
                @include font-size(36px);
                @media screen and (max-width: 1024px) {
                    @include font-size(32px);
                }
            }
            margin-top: 5rem;
            ul {
                list-style: disc;
                padding-left: 2rem;
                margin-top: 1rem;
                li {
                    line-height: 1.5;
                    &:not(:last-child) {
                        margin-bottom: 0.5rem;
                    }
                    @media screen and (max-width: 1024px) {
                        @include font-size(16px);
                    }
                }
            }
        }
    }
</style>