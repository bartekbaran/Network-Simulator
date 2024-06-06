import React, {useState} from "react";
import { Description, Field, Input, Label } from '@headlessui/react'

function InputComponent({
	name,
	defaultValue,
	functionToUpdate
}: {
	name: string,
	defaultValue: number,
	functionToUpdate: any;
}) {

	return(
		<>
			<Field>
				<Label>{name}</Label>
				<Input type="number" name="value"
							 className="relative w-full cursor-default rounded-lg bg-white py-2 pl-5 pr-10 text-left border-solid border-2 border-gray-100
                            shadow-md focus:outline-none col-span-3 min-h-[43.2px]
                            focus-visible:ring-white/75 sm:text-md"
							 value={defaultValue ? defaultValue : ''}
							 onChange={functionToUpdate}
				></Input>
			</Field>
		</>
	)
}

export default InputComponent;
