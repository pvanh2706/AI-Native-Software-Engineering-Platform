<script setup lang="ts">
/**
 * TRANG THAM CHIẾU BỘ COMPONENT.
 *
 * Đây là hợp đồng giữa thiết kế và code: mọi thứ vẽ trong Figma phải có mặt ở
 * trang này. Thấy một thành phần KHÔNG có ở đây nghĩa là thiết kế đang phát
 * minh component mới — phải qua gate, không tự dựng (docs/07 §12).
 *
 * Cũng là nơi kiểm nhanh: đổi sáng/tối, xem trạng thái, xem mật độ.
 */
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Plus } from 'lucide-vue-next'

const TONE = {
  success: 'bg-success-container text-on-success-container border-transparent',
  warning: 'bg-warning-container text-on-warning-container border-transparent',
  danger: 'bg-danger-container text-on-danger-container border-transparent',
  info: 'bg-primary-container text-on-primary-container border-transparent',
}
const BTN = ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const
const SIZE = ['xs', 'sm', 'default', 'lg'] as const
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-headline">Bộ component</h1>
      <p class="mt-1 text-muted-foreground">
        Hợp đồng giữa thiết kế và code. Thiết kế chỉ được dùng những gì có ở đây.
      </p>
    </div>

    <section>
      <h2 class="mb-3 text-title-md font-medium">Button</h2>
      <div class="rounded-xs border bg-card p-4 space-y-3">
        <div class="flex flex-wrap items-center gap-2">
          <Button v-for="v in BTN" :key="v" :variant="v">{{ v }}</Button>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Button v-for="s in SIZE" :key="s" :size="s" variant="outline">size {{ s }}</Button>
          <Button size="icon-sm" variant="ghost" aria-label="Thêm"><Plus /></Button>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <Button disabled>disabled</Button>
          <Button variant="outline" disabled>disabled</Button>
          <Button><Plus />có icon</Button>
        </div>
      </div>
    </section>

    <section>
      <h2 class="mb-3 text-title-md font-medium">Badge — trạng thái nghiệp vụ</h2>
      <div class="rounded-xs border bg-card p-4">
        <div class="flex flex-wrap items-center gap-2">
          <Badge>default</Badge>
          <Badge variant="secondary">secondary</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="destructive">destructive</Badge>
          <Separator orientation="vertical" class="h-5" />
          <Badge variant="outline" :class="TONE.success">Đang bật</Badge>
          <Badge variant="outline" :class="TONE.warning">Nháp</Badge>
          <Badge variant="outline" :class="TONE.danger">Không hợp lệ</Badge>
          <Badge variant="outline" :class="TONE.info">Tự đóng → Done</Badge>
        </div>
        <p class="mt-3 text-body-sm text-muted-foreground">
          Registry chỉ có neutral + destructive. Bốn tone nghiệp vụ bên phải phủ bằng token của Design System.
        </p>
      </div>
    </section>

    <section>
      <h2 class="mb-3 text-title-md font-medium">Ô nhập</h2>
      <div class="rounded-xs border bg-card p-4 grid gap-4 md:grid-cols-2 max-w-[840px]">
        <div class="grid gap-2">
          <Label for="k-text">Nhãn thường</Label>
          <Input id="k-text" placeholder="VD: PROJ-123" />
        </div>
        <div class="grid gap-2">
          <Label for="k-sel">Select</Label>
          <Select>
            <SelectTrigger id="k-sel"><SelectValue placeholder="Chọn status đích" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="k-lock">Trường khoá <span class="font-normal text-muted-foreground">· khoá bởi mẫu</span></Label>
          <Input id="k-lock" model-value="Medium" readonly class="border-dashed bg-muted text-muted-foreground" />
        </div>
        <div class="grid gap-2">
          <Label for="k-err">Có lỗi <span class="text-destructive">*</span></Label>
          <Input id="k-err" aria-invalid="true" model-value="" />
          <p class="text-body-sm text-destructive">Ngày kết thúc phải sau ngày bắt đầu.</p>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="k-cb" /><Label for="k-cb">Checkbox</Label>
        </div>
        <div class="flex items-center gap-3">
          <Switch id="k-sw" /><Label for="k-sw">Tự đóng issue sau khi tạo</Label>
        </div>
      </div>
    </section>

    <section>
      <h2 class="mb-3 text-title-md font-medium">Bảng — mật độ compact</h2>
      <div class="rounded-xs border bg-card p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mẫu</TableHead>
              <TableHead class="w-24">Loại</TableHead>
              <TableHead class="w-36">Trạng thái</TableHead>
              <TableHead class="w-24 text-right">Số mẫu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow><TableCell class="font-medium">Ghi nhận hỗ trợ đã xử lý</TableCell><TableCell>Task</TableCell>
              <TableCell><Badge variant="outline" :class="TONE.success">Đang bật</Badge></TableCell>
              <TableCell class="text-right tabular-nums">5</TableCell></TableRow>
            <TableRow><TableCell class="font-medium">Sự cố cần theo dõi</TableCell><TableCell>Bug</TableCell>
              <TableCell><Badge variant="outline" :class="TONE.warning">Nháp</Badge></TableCell>
              <TableCell class="text-right tabular-nums">12</TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
    </section>

    <section>
      <h2 class="mb-3 text-title-md font-medium">Trạng thái bắt buộc</h2>
      <p class="mb-3 text-body-sm text-muted-foreground">
        Figma hầu như không vẽ những thứ này. Chúng phải có sẵn ở đây để bản convert tự bù (STATE-01…06).
      </p>
      <Tabs default-value="empty">
        <TabsList>
          <TabsTrigger value="empty">Rỗng</TabsTrigger>
          <TabsTrigger value="filter">Lọc không ra</TabsTrigger>
          <TabsTrigger value="error">Lỗi</TabsTrigger>
          <TabsTrigger value="perm">Không quyền</TabsTrigger>
        </TabsList>
        <TabsContent value="empty">
          <div class="rounded-xs border bg-card p-4">
            <Table>
              <TableHeader><TableRow><TableHead>Mẫu</TableHead><TableHead>Loại</TableHead></TableRow></TableHeader>
              <TableBody><TableEmpty :colspan="2">
                <div class="font-medium text-foreground">Chưa có mẫu nào cho dự án này</div>
                <div class="mt-1 text-body-sm text-muted-foreground">Tạo mẫu đầu tiên để cả nhóm dùng chung.</div>
                <Button class="mt-3"><Plus />Tạo mẫu</Button>
              </TableEmpty></TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="filter">
          <div class="rounded-xs border bg-card p-4">
            <Table>
              <TableHeader><TableRow><TableHead>Mẫu</TableHead><TableHead>Loại</TableHead></TableRow></TableHeader>
              <TableBody><TableEmpty :colspan="2">
                <div class="font-medium text-foreground">Không có mẫu khớp bộ lọc</div>
                <div class="mt-1 text-body-sm text-muted-foreground">Đang lọc: loại = Bug, trạng thái = Nháp.</div>
                <Button variant="outline" class="mt-3">Xoá bộ lọc</Button>
              </TableEmpty></TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="error">
          <div class="flex gap-3 rounded-xs bg-danger-container p-3 text-on-danger-container">
            <span>⚠</span>
            <div>
              <b>Không tải được danh sách mẫu.</b> Jira không phản hồi sau 15 giây.<br>
              Dữ liệu đang hiển thị là bản lưu lúc 08:12. Bấm Thử lại, hoặc báo quản trị hệ thống nếu lặp lại.
              <div class="mt-2"><Button variant="outline" size="sm">Thử lại</Button></div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="perm">
          <div class="flex gap-3 rounded-xs bg-warning-container p-3 text-on-warning-container">
            <span>🔒</span>
            <div>Bạn không có quyền <code class="font-mono">ADMINISTER_PROJECTS</code> trên dự án này nên chỉ <b>xem</b> được cấu hình.
              Nhờ quản trị dự án cấp quyền trên Jira. Server cũng chặn, không chỉ khoá giao diện.</div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  </div>
</template>
