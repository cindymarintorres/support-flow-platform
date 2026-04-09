import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type AppButtonProps = React.ComponentProps<typeof Button> & {
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  isLoading?: boolean
  loadingText?: string
}

export function AppButton({
  children,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  isLoading = false,
  loadingText,
  className,
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn('gap-2', className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner className="h-4 w-4" />
          {loadingText ?? children}
        </>
      ) : (
        <>
          {LeftIcon && <LeftIcon className="h-4 w-4" />}
          {children}
          {RightIcon && <RightIcon className="h-4 w-4" />}
        </>
      )}
    </Button>
  )
}