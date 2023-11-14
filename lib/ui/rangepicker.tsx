/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-nested-ternary */
import * as React from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface DatePickerWithRangeProps {
  className?: React.HTMLAttributes<HTMLDivElement>["className"]
  date?: DateRange
  setDate?: (date?: DateRange) => void
}

export function DatePickerWithRange(props: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", props.className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal w-full",
              !props.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {props.date?.from ? (
              props.date.to ? (
                <>
                  {format(props.date.from, "LLL dd, y")} -{" "}
                  {format(props.date.to, "LLL dd, y")}
                </>
              ) : (
                format(props.date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={props.date?.from}
            initialFocus
            mode="range"
            numberOfMonths={2}
            onSelect={props.setDate}
            selected={props.date}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
