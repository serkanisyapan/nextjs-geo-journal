interface FormInput {
  label: string;
  type: string;
  title: string;
}

const formInputs: FormInput[] = [
  {
    label: 'API Key',
    type: 'password',
    title: 'apiKey',
  },
  {
    label: 'Title',
    type: 'text',
    title: 'title',
  },
  {
    label: 'Description',
    type: 'textarea',
    title: 'description',
  },
  {
    label: 'Img URL',
    type: 'url',
    title: 'image',
  },
  {
    label: 'Rating',
    type: 'number',
    title: 'rating',
  },
  {
    label: 'Latitude',
    type: 'number',
    title: 'latitude',
  },
  {
    label: 'Longitude',
    type: 'number',
    title: 'longitude',
  },
  {
    label: 'Visit Date',
    type: 'date',
    title: 'visitDate',
  },
];

export default formInputs;
