interface AlertBoxProps {
  alertMessage: {
    message: string;
    status: string;
  };
}
export default function AlertBox({ alertMessage }: AlertBoxProps) {
  let alertIcon;
  if (alertMessage.status === 'success') {
    alertIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  } else {
    alertIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }
  return (
    <div
      className={`fixed left-[40%] top-5 w-[500px] h-[50px] alert alert-${alertMessage.status} shadow-lg z-[999]`}
    >
      <div>
        {alertIcon}
        <span className="text-lg">{alertMessage.message}</span>
      </div>
    </div>
  );
}
