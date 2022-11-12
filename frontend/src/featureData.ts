export const nav = [
  { name: "New Template", href: "/template/draft" },
  { name: "Drafts", href: "/template/draft/preview" },
  { name: "Pending", href: "/template/pending" },
  { name: "Approved", href: "/template/approved" },
  { name: "Rejected", href: "/template/rejected" },
];

export const features = {
  feature1: {
    pretitle: 'Maker-Checker mechanism',
    title: 'Admin approves the templates',
    subtitle:
      'The newly created template remains in the pending state, until it is approved by admin. If not approved, the feedback is  provided.',
    image: "/img/features/approved.jpg",
  },
  feature2: {
    pretitle: 'Input Fields',
    title: 'Add custom inputs and placeholders',
    subtitle: "Only the input fields added and empty table cells can be filled in the approved templates.",
    image: "/img/features/editor.png",
  },
  feature3: {
    pretitle: 'secure data',
    title: 'Document Encryption',
    subtitle: "The encrypted document can only be accessed by the user and the firm using their corresponding passwords.",
    image: "/img/features/encrypted.jpg",
  },
};



