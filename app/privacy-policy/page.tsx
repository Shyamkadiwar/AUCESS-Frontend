import React from 'react';
import { Shield, Users, Lock, Eye, FileText, Globe, Phone, Mail, ArrowLeft, Database, UserCheck, Settings } from 'lucide-react';
import mainLogo from "@/public/mainLogo.png"
import Image from 'next/image';

const PrivacyPolicyPage = () => {
    const lastUpdated = "January 2025";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        {/* Back button */}
                        <div className="flex items-center gap-4">
                            <a
                                href="/signup"
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Sign Up
                            </a>
                        </div>

                        {/* Logo section with added spacing */}
                        <div className="flex items-center gap-3 py-2">
                            <Image
                                src={mainLogo}
                                alt="logo"
                                height={60}
                                width={50}
                                style={{ height: "60px", width: "50px" }}
                            />
                            <h1 className="font-neue-bold text-black md:text-2xl">AUCESS</h1>
                        </div>
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use Aucess services.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        This Privacy Policy was last revised on <span className="font-medium">{lastUpdated}</span>
                    </p>
                </div>

                {/* Content Sections */}
                <div className="bg-white rounded-lg shadow-sm border p-8 space-y-10">

                    {/* Section 1: Information We Collect */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Database className="w-4 h-4 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">1. Information We Collect</h2>
                        </div>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            We may collect the following types of personal data:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    Personal Information
                                </h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>• Name, age, gender, date of birth</li>
                                    <li>• Email address, phone number</li>
                                    <li>• Postal address</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-green-600" />
                                    Educational Data
                                </h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>• Academic records and grades</li>
                                    <li>• Attendance and learning progress</li>
                                    <li>• Assessment results</li>
                                </ul>
                            </div>

                            <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Settings className="w-5 h-5 text-purple-600" />
                                    Technical Information
                                </h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>• IP address and browser type</li>
                                    <li>• Device information</li>
                                    <li>• Usage data and analytics</li>
                                </ul>
                            </div>

                            <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-orange-600" />
                                    Account Data
                                </h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>• Username and password</li>
                                    <li>• Profile information</li>
                                    <li>• Communication records</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: How We Collect Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <Eye className="w-4 h-4 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">2. How We Collect Information</h2>
                        </div>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            We collect data through various means, including:
                        </p>
                        <div className="space-y-4">
                            <div className="border-l-4 border-blue-400 pl-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct Collection</h3>
                                <p className="text-gray-700">When you register, create a profile, fill out forms, or communicate with us.</p>
                            </div>
                            <div className="border-l-4 border-green-400 pl-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatic Collection</h3>
                                <p className="text-gray-700">Through cookies and similar technologies when you use our website or application.</p>
                            </div>
                            <div className="border-l-4 border-purple-400 pl-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Third Parties</h3>
                                <p className="text-gray-700">From educational institutions or other authorized entities providing services to you.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Purpose of Data Collection */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-4 h-4 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">3. Purpose of Data Collection</h2>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">We use your personal data for the following purposes:</p>
                        <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                            <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
                                <li>• Provide and improve educational services</li>
                                <li>• Personalize your learning experience</li>
                                <li>• Communicate progress and updates</li>
                                <li>• Administer assessments and track performance</li>
                                <li>• Provide technical support and address inquiries</li>
                                <li>• Analyze usage patterns and improve our platform</li>
                                <li>• Ensure the security and integrity of our services</li>
                                <li>• Comply with legal and regulatory requirements</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4: Data Sharing */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Users className="w-4 h-4 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">4. Data Sharing and Disclosure</h2>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">We may share your personal data with:</p>
                        <div className="space-y-4">
                            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Educational Institutions</h3>
                                <p className="text-gray-700 text-sm">Schools, teachers, and administrators as necessary for educational purposes.</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Providers</h3>
                                <p className="text-gray-700 text-sm">Third-party vendors who assist us in delivering our services (hosting, analytics, customer support). These providers are contractually obligated to protect your data.</p>
                            </div>
                            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Authorities</h3>
                                <p className="text-gray-700 text-sm">When required by law, court order, or other legal processes.</p>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Transfers</h3>
                                <p className="text-gray-700 text-sm">In the event of a merger, acquisition, or sale of assets, your data may be transferred to the acquiring entity.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Data Security */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <Lock className="w-4 h-4 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">5. Data Security</h2>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We implement reasonable security practices and procedures to protect your personal data from unauthorized access, use, disclosure, alteration, or destruction. These measures include:
                        </p>
                        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                            <ul className="space-y-2 text-gray-700">
                                <li>• Encryption of sensitive data during transmission and storage</li>
                                <li>• Firewalls and intrusion detection systems</li>
                                <li>• Access controls and authentication protocols</li>
                                <li>• Regular security audits and vulnerability assessments</li>
                                <li>• Employee training on data privacy and security</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 6: Data Retention */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We will retain your personal data only for as long as necessary to fulfill the purposes outlined in this
                            Privacy Policy, or for a longer period if required or permitted by law. When the data is no longer needed,
                            we will securely dispose of it.
                        </p>
                    </section>

                    {/* Section 7: Your Rights */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <Shield className="w-4 h-4 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">7. Your Rights</h2>
                        </div>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            You may have certain rights regarding your personal data, depending on applicable laws, which may include:
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Access</h3>
                                <p className="text-gray-700 text-sm">Request access to the personal data we hold about you</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Rectification</h3>
                                <p className="text-gray-700 text-sm">Request correction of inaccurate or incomplete personal data</p>
                            </div>
                            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Erasure</h3>
                                <p className="text-gray-700 text-sm">Request deletion of your personal data under certain circumstances</p>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Restrict Processing</h3>
                                <p className="text-gray-700 text-sm">Request restriction of processing under certain circumstances</p>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Data Portability</h3>
                                <p className="text-gray-700 text-sm">Receive your data in a structured, machine-readable format</p>
                            </div>
                            <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Object</h3>
                                <p className="text-gray-700 text-sm">Object to the processing of your personal data in certain situations</p>
                            </div>
                            <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Right to Withdraw Consent</h3>
                                <p className="text-gray-700 text-sm">Withdraw your consent at any time if processing is based on consent</p>
                            </div>
                        </div>

                        <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded-lg">
                            <p className="text-gray-700 text-sm">
                                To exercise these rights, please contact us using the contact information provided below.
                                We may require you to verify your identity before processing your request.
                            </p>
                        </div>
                    </section>

                    {/* Section 8: Children's Privacy */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            If our services are used by children, we are committed to complying with applicable child privacy laws.
                            We will obtain verifiable parental consent for the collection and processing of children's personal data where required.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                            <p className="text-gray-700 text-sm">
                                Parents or guardians have the right to review their child's personal data, request its deletion,
                                and refuse further collection or use.
                            </p>
                        </div>
                    </section>

                    {/* Section 9: Cross-Border Data Transfers */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                                <Globe className="w-4 h-4 text-cyan-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">9. Cross-Border Data Transfers</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            If your personal data is transferred to and processed in countries outside of your country of residence,
                            we will ensure that appropriate safeguards are in place to protect your data in accordance with
                            applicable data protection laws.
                        </p>
                    </section>

                    {/* Section 10: Grievance Officer */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Grievance Officer</h2>
                        <p className="text-gray-700 leading-relaxed">
                            In accordance with the Information Technology Act, 2000 and its rules, we have designated a Grievance Officer
                            to address any concerns or complaints regarding the processing of personal data. The contact details of the
                            Grievance Officer will be provided on our website.
                        </p>
                    </section>

                    {/* Section 11: Updates to Privacy Policy */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Updates to this Privacy Policy</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws.
                            We will notify you of any material changes by posting the updated policy on our website or through other
                            appropriate communication channels.
                        </p>
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                            <p className="text-gray-700 text-sm">
                                The date of the latest revision will be indicated at the top of this policy.
                            </p>
                        </div>
                    </section>

                    {/* Section 12: Contact Us */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <Mail className="w-4 h-4 text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900">12. Contact Us</h2>
                        </div>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your
                            personal data, please contact us at:
                        </p>

                        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">AUCESS TECHNOLOGY PRIVATE LIMITED</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-emerald-600" />
                                    <span className="text-gray-700">support@aucess.in</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-emerald-600" />
                                    <span className="text-gray-700">9023066078</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Note */}
                <div className="mt-12 text-center">
                    <div className="bg-white border-2 border-blue-200 p-6 rounded-lg">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Privacy Matters</h3>
                        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                            We are committed to protecting your privacy and handling your personal data responsibly.
                            If you have any questions about our privacy practices, please don't hesitate to reach out to us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;