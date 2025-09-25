"use client"
import {useCallback, useEffect} from "react";

import type {ContentBlock, FeedEventPayload, MarkdownContentBlock, TextContentBlock,} from "@knocklabs/client";
import {useKnockFeed} from "@knocklabs/react";
import {toast} from "sonner";

const isRenderableBlock = (
    block: ContentBlock,
): block is MarkdownContentBlock | TextContentBlock =>
    block.type === "markdown" || block.type === "text";

export default function NotificationToaster() {
   const { feedClient } = useKnockFeed();

   const onNotificationsReceived = useCallback(({ items }: FeedEventPayload) => {
      // Whenever we receive a new notification from our real-time stream, show a toast
      // (note here that we can receive > 1 items in a batch)
      items.forEach((notification) => {
         const firstRenderableBlock = notification.blocks.find(isRenderableBlock);
         if (!firstRenderableBlock) {
            return;
         }

         //Use toast.custom to render the HTML content of the notification
         toast.info(
             <div
                 dangerouslySetInnerHTML={{ __html: firstRenderableBlock.rendered }}
             ></div>,
             { id: notification.id },
         );
      });

      // Optionally, you may want to mark them as "seen" as well
      feedClient.markAsSeen(items);
   }, [feedClient]);

   useEffect(() => {
      // Receive all real-time notifications on our feed
      feedClient.on("items.received.realtime", onNotificationsReceived);

      // Cleanup
      return () =>
          feedClient.off("items.received.realtime", onNotificationsReceived);
   }, [feedClient, onNotificationsReceived]);

   return null
}
