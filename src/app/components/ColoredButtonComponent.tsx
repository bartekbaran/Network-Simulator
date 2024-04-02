function ColoredButtonComponent({
  color,
  disabled,
  text,
}: {
  color: string;
  disabled: boolean;
  text: string;
}) {
  return (
    <button
      type="submit"
      className={`inline-flex w-full justify-center rounded-md bg-${color}-700 px-3 py-2 text-sm font-semibold 
        text-white shadow-sm hover:bg-${color}-600 focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2 focus-visible:outline-${color}-700 sm:col-start-2 disabled:opacity-25`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default ColoredButtonComponent;
