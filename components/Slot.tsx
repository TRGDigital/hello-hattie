import { altFor } from '@/lib/cms'
import { SlotBase } from '@/components/SlotBase'

/** An image slot with the alt text from the admin, if one has been set for this photo. Server only:
 *  inside client components use SlotBase and pass the alt text in. */
export async function Slot(props: Parameters<typeof SlotBase>[0]) {
  const brief = props.src ? await altFor(props.src, props.brief) : props.brief
  return <SlotBase {...props} brief={brief} />
}
