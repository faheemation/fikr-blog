import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { FileText, Scale, UserCheck, AlertCircle } from "lucide-react";

export default function TermsPage() {
    return (
        <>
            <Navigation />

            <main className="min-h-screen bg-black pt-16">
                {/* Hero */}
                <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
                    <div className="container-custom max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Scale className="w-12 h-12" />
                            <h1 className="text-5xl md:text-6xl font-serif font-bold">
                                Terms of Service
                            </h1>
                        </div>
                        <p className="text-xl text-white/80">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 bg-white">
                    <div className="container-custom max-w-4xl prose prose-lg">
                        <h2>Agreement to Terms</h2>
                        <p>
                            By accessing and using Fikr By Sio Varam ("the Website"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this website.
                        </p>

                        <h2>Use License</h2>
                        <p>
                            Permission is granted to temporarily access the materials (information or software) on Fikr By Sio Varam for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul>
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for any commercial purpose or public display</li>
                            <li>Attempt to decompile or reverse engineer any software on the Website</li>
                            <li>Remove any copyright or proprietary notations from the materials</li>
                            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                        </ul>

                        <h2>User Accounts</h2>
                        <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
                        <ul>
                            <li>Maintaining the confidentiality of your account and password</li>
                            <li>All activities that occur under your account</li>
                            <li>Notifying us immediately of any unauthorized use</li>
                        </ul>
                        <p>We reserve the right to terminate accounts that violate these terms.</p>

                        <h2>User Content</h2>
                        <h3>Your Responsibilities</h3>
                        <p>When posting comments or other content, you agree not to:</p>
                        <ul>
                            <li>Post content that is illegal, harmful, or offensive</li>
                            <li>Violate any intellectual property rights</li>
                            <li>Impersonate any person or entity</li>
                            <li>Spam or post unsolicited commercial content</li>
                            <li>Harass, abuse, or harm other users</li>
                            <li>Attempt to interfere with the Website's functionality</li>
                        </ul>

                        <h3>Content Ownership</h3>
                        <p>
                            You retain ownership of content you post. However, by posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your content in connection with operating the Website.
                        </p>

                        <h2>Intellectual Property</h2>
                        <p>
                            All content on this Website, including text, graphics, logos, images, and software, is the property of Fikr By Sio Varam or its content suppliers and is protected by copyright and intellectual property laws.
                        </p>

                        <h2>Disclaimer</h2>
                        <p>
                            The materials on Fikr By Sio Varam are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                        </p>

                        <h2>Limitations of Liability</h2>
                        <p>
                            In no event shall Fikr By Sio Varam or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Website.
                        </p>

                        <h2>Links to Third-Party Websites</h2>
                        <p>
                            Our Website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.
                        </p>

                        <h2>Modifications</h2>
                        <p>
                            We may revise these Terms of Service at any time without notice. By using this Website, you agree to be bound by the current version of these Terms of Service.
                        </p>

                        <h2>Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                        </p>

                        <h2>Termination</h2>
                        <p>
                            We reserve the right to terminate or suspend your account and access to the Website immediately, without prior notice or liability, for any reason, including breach of these Terms.
                        </p>

                        <h2>Contact Information</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us at:
                        </p>
                        <p>
                            Email: <a href="mailto:legal@fikr.blog">legal@fikr.blog</a>
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
