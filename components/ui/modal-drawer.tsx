"use client"

import * as React from "react"
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerGrip,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

const ModalDrawerContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: false,
})

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)")
    const update = () => setIsDesktop(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return isDesktop
}

export interface ModalDrawerProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function ModalDrawer({ children, ...props }: ModalDrawerProps) {
  const isDesktop = useIsDesktop()

  return (
    <ModalDrawerContext.Provider value={{ isDesktop }}>
      {isDesktop ? (
        <Dialog {...props}>{children}</Dialog>
      ) : (
        <Drawer side="bottom" {...props}>
          {children}
        </Drawer>
      )}
    </ModalDrawerContext.Provider>
  )
}

function ModalDrawerTrigger(
  props: Omit<React.ComponentPropsWithoutRef<typeof DialogTrigger>, "controller">
) {
  const { isDesktop } = React.useContext(ModalDrawerContext)
  return isDesktop ? <DialogTrigger {...props} /> : <DrawerTrigger {...props} />
}

function ModalDrawerClose(
  props: Omit<React.ComponentPropsWithoutRef<typeof DialogClose>, "controller">
) {
  const { isDesktop } = React.useContext(ModalDrawerContext)
  return isDesktop ? <DialogClose {...props} /> : <DrawerClose {...props} />
}

const maxWidthMap = {
  sm: "sm:w-[min(24rem,calc(100%-2rem))]",
  md: "sm:w-[min(28rem,calc(100%-2rem))]",
  lg: "sm:w-[min(32rem,calc(100%-2rem))]",
  xl: "sm:w-[min(36rem,calc(100%-2rem))]",
  "2xl": "sm:w-[min(42rem,calc(100%-2rem))]",
}

export interface ModalDrawerContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: keyof typeof maxWidthMap
  showCloseButton?: boolean
  children?: React.ReactNode
}

function ModalDrawerContent({
  className,
  maxWidth = "lg",
  showCloseButton = true,
  children,
  ...props
}: ModalDrawerContentProps) {
  const { isDesktop } = React.useContext(ModalDrawerContext)

  if (isDesktop) {
    return (
      <>
        <DialogBackdrop />
        <DialogContent
          showCloseButton={showCloseButton}
          className={cn(maxWidthMap[maxWidth], className)}
          {...props}
        >
          {children}
        </DialogContent>
      </>
    )
  }

  return (
    <>
      <DrawerBackdrop />
      <DrawerContent
        className={cn("max-h-[90dvh] overflow-y-auto", className)}
        {...props}
      >
        <DrawerGrip />
        {children}
      </DrawerContent>
    </>
  )
}

function ModalDrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isDesktop } = React.useContext(ModalDrawerContext)
  return isDesktop ? (
    <DialogHeader className={className} {...props} />
  ) : (
    <div className={cn("flex flex-col gap-1.5", className)} {...props} />
  )
}

function ModalDrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <DialogFooter className={className} {...props} />
}

function ModalDrawerTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogTitle>) {
  const { isDesktop } = React.useContext(ModalDrawerContext)
  return isDesktop ? (
    <DialogTitle className={className} {...props} />
  ) : (
    <DrawerTitle className={className} {...props} />
  )
}

function ModalDrawerDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogDescription>) {
  const { isDesktop } = React.useContext(ModalDrawerContext)
  return isDesktop ? (
    <DialogDescription className={className} {...props} />
  ) : (
    <DrawerDescription className={className} {...props} />
  )
}

export {
  ModalDrawer,
  ModalDrawerTrigger,
  ModalDrawerContent,
  ModalDrawerHeader,
  ModalDrawerFooter,
  ModalDrawerTitle,
  ModalDrawerDescription,
  ModalDrawerClose,
}
