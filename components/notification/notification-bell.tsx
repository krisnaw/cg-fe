"use client"
import {KnockFeedProvider, KnockProvider, NotificationFeedPopover, NotificationIconButton,} from "@knocklabs/react";
import {useRef, useState} from "react";
import "@knocklabs/react/dist/index.css";
import NotificationToaster from "@/components/notification/notification-toaster";

type Props = {
   userId: string
   feedId: string
   knockApiKey: string
}

export default function NotificationBell({userId, feedId, knockApiKey }: Props) {
   const [isVisible, setIsVisible] = useState(false);
   const notifButtonRef = useRef(null);

   return (
       <KnockProvider apiKey={knockApiKey} user={{ id: userId }}>
          {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
          <KnockFeedProvider feedId={feedId}>
             <div>
                <NotificationIconButton
                    ref={notifButtonRef}
                    onClick={(e) => setIsVisible(!isVisible)}
                />
                <NotificationFeedPopover
                    buttonRef={notifButtonRef}
                    isVisible={isVisible}
                    onClose={() => setIsVisible(false)}
                />
             </div>
             <NotificationToaster />
          </KnockFeedProvider>
       </KnockProvider>
   )
}