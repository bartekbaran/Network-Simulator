function UncoloredButtonComponent({
  color,
  onClickFunction,
  text,
}: {
  color: string;
  onClickFunction: any;
  text: string;
}) {
  return (
    <button
      type="button"
      className={`mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 
        text-sm font-semibold text-${color}-900 shadow-sm ring-1 ring-inset ring-${color}-300 
        hover:bg-${color}-50 sm:col-start-1 sm:mt-0`}
      onClick={onClickFunction}
    >
      {text}
    </button>
  );
}

export default UncoloredButtonComponent;
