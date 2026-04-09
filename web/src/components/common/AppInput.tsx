import { LucideIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

type AppInputProps = React.ComponentProps<typeof InputGroupInput> & {
  label?: string
  error?: string
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  onIconClick?: () => void
}

export function AppInput({
  label,
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onIconClick,
  className,
  id,
  ...props       // type, placeholder, ...register(), onChange, etc
}: AppInputProps) {
  return (
    <div className="space-y-2">

      {label && (
        <Label
          htmlFor={id}
        // className={cn(error && 'text-red-500')}
        >
          {label}
        </Label>
      )}

      <InputGroup
        className={cn(
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
      >

        {LeftIcon && (
          <InputGroupAddon align="inline-start">
            <LeftIcon className="h-4 w-4 text-slate-400" />
          </InputGroupAddon>
        )}

        <InputGroupInput
          id={id}
          {...props}
        />

        {RightIcon && (
          <InputGroupAddon align="inline-end">
            <button
              type="button"
              onClick={onIconClick}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RightIcon className="h-4 w-4" />
            </button>
          </InputGroupAddon>
        )}

      </InputGroup>

      {error && (
        <p className="text-xs text-red-500 font-medium">{error}</p>
      )}

    </div>
  )
}