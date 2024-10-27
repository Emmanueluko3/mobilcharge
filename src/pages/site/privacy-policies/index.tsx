import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PrivacyPolicies: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center px-4 lg:px-36 py-20">
      <h2 className="text-xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center">
        {t("Privacy and Data Policy")}
      </h2>

      <p className="mb-10 font-medium">
        {t(
          "MobilCharge is committed to protecting your privacy. This Privacy and Data Policy outlines how we collect, use, and protect your personal information when you use our services or visit our website, www.mobilecharge.ca."
        )}
      </p>

      <div>
        {[
          {
            title: "Information Collection",
            texts: [
              "We collect personal information that you voluntarily provide to us when you register on the Website, use our services, or contact us. This includes:",
              "Contact Information: Name, email address, phone number, and mailing address.",
              "Vehicle Information: Make, model, and license plate number.",
              "Payment Information: Credit card details and billing information.",
              "Usage Data: Information about your interactions with our Website, such as pages visited, time spent on each page, and the services used.",
            ],
          },
          {
            title: "Use of Information",
            texts: [
              "We use the information collected for various purposes, including:",
              "To provide, operate, and maintain our services.",
              "To process your transactions and manage your orders.",
              "To communicate with you, including responding to inquiries and providing customer support.",
              "To send you updates, marketing communications, and promotional materials related to our services.",
              "To improve our Website and services based on user feedback and usage patterns.",
              "To ensure the security and integrity of our systems and databases.",
            ],
          },
          {
            title: "Data Protection",
            texts: [
              "We implement a variety of security measures to protect your personal information, including:",
              "Encryption: We use industry-standard encryption to protect your data during transmission and storage.",
              "Access Controls: Access to your personal information is restricted to authorized personnel who need it to perform their job functions.",
              "Regular Audits: We conduct regular audits and assessments to ensure our security practices are effective and up-to-date.",
              "Secure Payment Processing: We use third-party payment processors that comply with PCI-DSS standards to process your payments securely.",
            ],
          },
          {
            title: "Sharing of Information",
            texts: [
              "We do not sell, trade, or otherwise transfer your personal information to outside parties, except in the following circumstances:",

              "Service Providers: We may share your information with trusted third-party service providers who assist us in operating our Website and providing our services, as long as they agree to keep this information confidential.",

              "Legal Requirements: We may disclose your information if required by law, such as to comply with a subpoena, or if we believe that such action is necessary to protect our rights or comply with a judicial proceeding.",
            ],
          },
          {
            title: "Cookies",
            texts: [
              "Our Website uses cookies and similar technologies to enhance user experience and gather information about how our Website is used. You can manage your cookie preferences through your browser settings. However, disabling cookies may affect the functionality of our Website.",
            ],
          },
          {
            title: "Data Retention",
            texts: [
              "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy unless a longer retention period is required or permitted by law. Once your information is no longer needed, we will securely delete them.",
            ],
          },
          {
            title: "Changes to Policy",
            texts: [
              "This Privacy and Data Policy is subject to change(s) from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on our Website with the updated effective date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.",
            ],
          },
          {
            title: "Contact Us",
            texts: [
              "If you have any questions or concerns about this policy or our data practices, please contact us at:",
            ],
          },
        ].map((item, index) => (
          <div key={index} className="mb-8">
            <h3 className="font-bold text-lg lg:text-xl">{`${index + 1}. ${t(
              item.title
            )}`}</h3>
            {item.texts.map((item, index) => (
              <p key={index} className="text-sm lg:text-base my-4">
                {t(item)}
              </p>
            ))}
          </div>
        ))}
        <p className="text-base">
          MobilCharge{" "}
          <Link to="mailto:info@mobilcharge.ca" className="text-primary-500">
            info@mobilcharge.ca
          </Link>{" "}
          Montreal, Quebec, Canada
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicies;
